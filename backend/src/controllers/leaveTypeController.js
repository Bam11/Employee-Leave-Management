const LeaveType = require('../models/LeaveType');
const { success, error } = require('../utils/apiResponse');

// GET /api/leave-types
const getLeaveTypes = async (req, res) => {
  try {
    const leaveTypes = await LeaveType.find().sort({ name: 1 });
    return success(res, 200, 'Leave types retrieved', leaveTypes);
  } catch (err) {
    return error(res, 500, 'Unable to retrieve leave types');
  }
};

// POST /api/admin/leave-types
const createLeaveType = async (req, res) => {
  try {
    const { name, defaultDaysAllowed, description } = req.body;

    const exists = await LeaveType.findOne({ name });
    if (exists) {
      return error(res, 409, 'A leave type with this name already exists');
    }

    const leaveType = await LeaveType.create({ name, defaultDaysAllowed, description });
    return success(res, 201, 'Leave type created', leaveType);
  } catch (err) {
    return error(res, 500, 'Unable to create leave type');
  }
};

// PUT /api/admin/leave-types/:id
const updateLeaveType = async (req, res) => {
  try {
    const leaveType = await LeaveType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!leaveType) {
      return error(res, 404, 'Leave type not found');
    }

    return success(res, 200, 'Leave type updated', leaveType);
  } catch (err) {
    return error(res, 500, 'Unable to update leave type');
  }
};

// DELETE /api/admin/leave-types/:id
const deleteLeaveType = async (req, res) => {
  try {
    const leaveType = await LeaveType.findByIdAndDelete(req.params.id);

    if (!leaveType) {
      return error(res, 404, 'Leave type not found');
    }

    return success(res, 200, 'Leave type deleted', null);
  } catch (err) {
    return error(res, 500, 'Unable to delete leave type');
  }
};

module.exports = { getLeaveTypes, createLeaveType, updateLeaveType, deleteLeaveType };
