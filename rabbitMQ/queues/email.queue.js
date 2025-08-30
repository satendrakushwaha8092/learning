require("dotenv").config();

const { Queue } = require('bullmq');
const connection = { host: process.env.REDIS_HOST, port: process.env.port };

const emailQueue = new Queue('emailQueue', { connection });
module.exports = emailQueue;
