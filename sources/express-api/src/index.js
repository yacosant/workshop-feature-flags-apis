const express = require('express');
const { getHealth } = require('./services/healthService');
const { getFeatures } = require('./services/featuresService');

const app = express();
const port = process.env.PORT || 3002;

function setCorsHeaders(res) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json'
  });
}

app.get('/health', async (req, res) => {
  setCorsHeaders(res);
  const health = await getHealth();
  res.json(health);
});

app.get('/features', async (req, res) => {
  setCorsHeaders(res);
  const features = await getFeatures();
  res.json(features);
});

app.listen(port, () => {
  console.log(`Express API listening on port ${port}`);
});
