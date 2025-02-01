const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URI,
});

client.on("error", (err) => console.error("Redis Client Error:", err));

client.connect().then(() => console.log("Redis Connected"));

module.exports = client;