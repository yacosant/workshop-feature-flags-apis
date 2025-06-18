const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3002;
const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/shared_db';

async function ping() {
  try {
    const client = new MongoClient(mongoUrl);
    await client.db().admin().ping();
    await client.close();
    return true;
  } catch {
    return false;
  }
}

app.get('/health', async (req, res) => {
  const isAlive = await ping();
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json'
  });
  res.json({ name: 'express-api', status: 200, database: isAlive ? "OK" : "KO" });
});

app.listen(port, () => {
  console.log(`Express API listening on port ${port}`);
});
