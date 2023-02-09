const {
  differentDataReport,
  notInSystemReport,
} = require('./../../config/constants.js');

module.exports = function createReport(relNummer) {
  //second arg is an array of the different fields.
  var args = arguments;
  var relNumObj = { Relationsnummer: relNummer };
  const reportArray = [];
  if (args.length === 1) {
    reportArray.push({ ...relNumObj, reportMessage: notInSystemReport });
  } else if (args.length === 2) {
    reportArray.push({
      ...relNumObj,
      reportMessage: differentDataReport + args[1],
    });
  } else {
    return false;
  }
  // console.log(reportArray);
  // console.log('------------------------------------');
  return reportArray;
};
