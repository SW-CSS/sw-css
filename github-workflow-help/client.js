const redis = require("redis");

const redisClient = redis.createClient({
  socket: {
    port: `${process.env.REDIS_PORT}`,
    host: `${process.env.REDIS_HOST}`,
  },
  password: `${process.env.REDIS_PASS}`,
});

redisClient.on("error", (err) => console.log("Error", err));

(async () => {
  await redisClient.connect();
})();
