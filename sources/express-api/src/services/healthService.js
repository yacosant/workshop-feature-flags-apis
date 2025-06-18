const { ping } = require('../db/mongo');

async function getHealth() {
  const isAlive = await ping();
  return {
    name: 'express-api',
    status: 200,
    database: isAlive ? 'OK' : 'KO'
  };
}

module.exports = { getHealth };
