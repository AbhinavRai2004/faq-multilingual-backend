const client = require("../config/redis");

const getCache = async (key) => {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
}

const setCache = async (key, data, ttl = 3600) => {
    client.set(key, JSON.stringify(data), { EX: ttl });
};

const delCache = async (key) => {
    await client.del(key);
};


module.exports = {getCache, setCache};