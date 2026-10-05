const LeaveRequest = require('../models/LeaveRequest');
const LeaveBalance = require('../models/LeaveBalance');
const { success, error } = require('../utils/apiResponse');

// Helper: calculate number of days between two dates (inclusive)
const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

// POST /api/leave-requests
const createLeaveRequest = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    const employeeId = req.user.id;

    const days = calculateDays(startDate, endDate);

    // Check balance before allowing the request
    const balance = await LeaveBalance.findOne({ employee: employeeId, leaveType });
    if (!balance) {
      return error(res, 404, 'No balance found for this leave type');
    }

    const remaining = balance.allocated - balance.used;
    if (days > remaining) {
      return error(res, 400, `Insufficient balance. You have ${remaining} day(s) remaining`);
    }

    // Prevent overlapping requests
    const overlapping = await LeaveRequest.findOne({
      employee: employeeId,
      status: { $in: ['pending', 'approved'] },
      $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
    });
    if (overlapping) {
      return error(res, 409, 'You already have a request covering these dates');
    }

    const leaveRequest = await LeaveRequest.create({
      employee: employeeId,
      leaveType,
      startDate,
      endDate,
      days,
      reason,
    });

    return success(res, 201, 'Leave request submitted', leaveRequest);
  } catch (err) {
    return error(res, 500, 'Unable to submit leave request');
  }
};

// GET /api/leave-requests/me
const getMyLeaveRequests = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const filter = { employee: req.user.id };
    if (status) {
      filter.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [requests, total] = await Promise.all([
      LeaveRequest.find(filter)
        .populate('leaveType', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      LeaveRequest.countDocuments(filter),
    ]);

    return success(res, 200, 'Leave requests retrieved', {
      requests,
      pagination: {
        currentPage: Number(page),
        pageSize: Number(limit),
        totalRecords: total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    return error(res, 500, 'Unable to retrieve leave requests');
  }
};

// DELETE /api/leave-requests/:id
const cancelLeaveRequest = async (req, res, next) => {
  try {
    const request = await LeaveRequest.findById(req.params.id);

    if (!request) {
      return error(res, 404, 'Leave request not found');
    }

    if (request.employee.toString() !== req.user.id) {
      return error(res, 403, 'You cannot cancel another employee\'s request');
    }

    if (request.status !== 'pending') {
      return error(res, 400, 'Only pending requests can be cancelled');
    }

    request.status = 'cancelled';
    await request.save();

    return success(res, 200, 'Leave request cancelled', request);
  } catch (err) {
    next(err);
  }
};

module.exports = { createLeaveRequest, getMyLeaveRequests, cancelLeaveRequest };
