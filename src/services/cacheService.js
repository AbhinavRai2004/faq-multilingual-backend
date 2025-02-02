const client = require("../config/redis");

// Get data from cache
const getCache = async (key) => {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
}

// Set data to cache
const setCache = async (key, data, ttl = 3600) => {
    client.set(key, JSON.stringify(data), { EX: ttl });
};

module.exports = {getCache, setCache};