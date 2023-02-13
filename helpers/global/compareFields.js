module.exports = function compareFields(messageData, foundData) {
  return Object.keys(messageData).filter(
    (field) => messageData[field] !== foundData[field]
  );
};
