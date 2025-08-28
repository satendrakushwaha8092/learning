const { Worker } = require('bullmq');
// const nodemailer = require('nodemailer');

const connection = { host: '127.0.0.1', port: 6379 };

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-app-password'
//   }
// });

const emailWorker = new Worker(
  'emailQueue',
  async (job) => {
    console.log(">>>>>>>>>>>>>",job.data.to.data.email)
    // await transporter.sendMail({
    //   from: '"My App" <your-email@gmail.com>',
    //   to: job.data.to,
    //   subject: job.data.subject,
    //   text: job.data.body
    // });
    console.log(`📧 Email sent to ${job.data.to}`);
  },
  { connection, concurrency: 50 }
);
