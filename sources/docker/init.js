db = db.getSiblingDB("shared_db");
//db.featureFlags.deleteMany({});
db.featureFlags.insertMany([
  { name: "showApiHealthTable", value: true },
  { name: "showAutoReload", value: true },
  { name: "showNewText", value: true },
  { name: "showExtraValue", value: true }]);