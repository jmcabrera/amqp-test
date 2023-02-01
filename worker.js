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

      channel.assertQueue(queue, {
        durable: true,
      });
      channel.prefetch(5);
      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );
      channel.consume(
        queue,
        function (msg) {
          console.log(" [x] Received %s", msg.content.toString());
          setTimeout(function () {
            console.log(" [x] Done %s", msg.content.toString());
            channel.ack(msg);
          }, 1000);
        },
        {
          // manual acknowledgment mode,
          // see ../confirms.html for details
          noAck: false,
        }
      );
    });
  }
);
