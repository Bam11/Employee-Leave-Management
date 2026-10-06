const LeaveBalance = require('../models/LeaveBalance');
const { success, error } = require('../utils/apiResponse');

// GET /api/leave-balance/me
const getMyLeaveBalance = async (req, res) => {
  try {
    const balances = await LeaveBalance.find({ employee: req.user.id })
      .populate('leaveType', 'name');

    const formatted = balances.map((b) => ({
      leaveType: b.leaveType.name,
      allocated: b.allocated,
      used: b.used,
      remaining: b.allocated - b.used,
    }));

    return success(res, 200, 'Leave balance retrieved', formatted);
  } catch (err) {
    return error(res, 500, 'Unable to retrieve leave balance');
  }
};

module.exports = { getMyLeaveBalance };
