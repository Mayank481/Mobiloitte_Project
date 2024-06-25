// publisher.js

const amqp = require('amqplib');

async function publishMessage(message) {
  try {
    const connection = await amqp.connect('amqp://localhost'); // Replace with your RabbitMQ server URL if not local
    const channel = await connection.createChannel();

    const exchange = 'user_events';

    // Assert the exchange
    await channel.assertExchange(exchange, 'direct', { durable: false });

    // Publish the message
    channel.publish(exchange, '', Buffer.from(message));

    console.log(`Message sent: ${message}`);

    // Close the channel and connection
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { publishMessage };
