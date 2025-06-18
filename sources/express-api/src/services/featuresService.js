const { findDocuments } = require('../db/mongo');

async function getFeatures() {
  const docs = await findDocuments('featureFlags', {});
  if (!docs.length) {
    return { status: 404, message: 'No features found' };
  }
  // Convert [{name, value}] to { name: value, ... }
  const features = docs.reduce((acc, { name, value }) => {
    acc[name] = value;
    return acc;
  }, {});
  return features;
}

module.exports = { getFeatures };
