module.exports = function compareFields(messageData, foundData) {
  var differentFields = [];
  // Compare two json data fields to each other and push the different fields to 'differentFields' array.
  Object.entries(messageData).forEach(([field, value]) => {
    if (value !== foundData[field]) {
      differentFields.push(field);
    }
  });
  return differentFields;
};
