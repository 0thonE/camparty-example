let dbStatusStr = 'OFF';

// get health of application
exports.getHealth  = (req, res) => {
  res.json({
    status: 'UP',
    dbConectionStatus: dbStatusStr
  });
};

exports.updateDbStatus = (status) => {
  dbStatusStr=status
};
