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
    var rep = { ...relNumObj, reportMessage: notInSystemReport };
    reportArray.push(rep);
    // if (!this.isInArray(this.reportArray, rep)) {
    //   this.reportArray.push(rep);
    //   console.log(this.reportArray.length);
    // } else {
    //   console.log('report allready exists');
    // }
  } else if (args.length === 2) {
    reportArray.push({
      ...relNumObj,
      reportMessage: differentDataReport + args[1],
    });
  } else {
    return false;
  }
  return reportArray;
};
