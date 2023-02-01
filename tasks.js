var amqp = require("amqplib/callback_api");

amqp.connect(
  {
    hostname: "amqp://rabbit.local.dev.auth0.com",
    username: "admin",
    password: "Cl@v3!Cl@v3!",
    vhost: "auth0",
  },
  function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = "task_queue";

      const date = Date.now();
      channel.assertQueue(queue, {
        durable: true,
      });

      Array.from(Array(10).keys())
        .map((v) => date + " " + v)
        .forEach((v) => {
          channel.sendToQueue(queue, Buffer.from(v), {
            persistent: true,
          });
          console.log(" [x] Sent '%s'", v);
        });
    });
    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 2000);
  }
);
