const emailQueue = require('./queues/email.queue');
// const notificationQueue = require('./queues/notification.queue');
module.exports.publishEmailTask = async (data) => {

console.log(">>>>>>>>>>>>>>",JSON.stringify(data))
  // const users = Array.from({ length: 10 }, (_, i) => ({
  //   email: `user${i}@example.com`,
  //   userId: i + 1
  // }));

  // for (const user of users) {
    await emailQueue.add('sendEmail', {
      to: {data},
      subject: 'Hello!',
      body: 'This is a bulk email test.'
    });

  //   await notificationQueue.add('sendNotification', {
  //     userId: user.userId,
  //     message: 'You have a new update!'
  //   });
  //  }

  console.log('✅ All jobs queued for emails and notifications');
}
