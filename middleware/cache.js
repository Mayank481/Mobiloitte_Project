const { Redis } = require("ioredis");
const redisClient = new Redis({
  host: "redis-stack",
  port: 6379,
});
const logger = require("../logger/logger");

const cache = async (req, res, next) => {
  const { id } = req.params;
  redisClient.get(id, (err, data) => {
    if (err) throw err;
    if (data) {
      logger.info(`Getting From Redis Cache!!`);
      return res.send(JSON.parse(data));
    } else {
      next();
    }
  });
};

module.exports = {
  cache,
};
