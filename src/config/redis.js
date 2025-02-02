const { createClient } = require('redis');
const client = createClient();

client.on('error', (err) => console.error('Redis Client Error:', err));
client.connect().then(() => console.log('Redis Connected'));

module.exports = client;