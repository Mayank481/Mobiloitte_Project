// worker.js

const amqp = require('amqplib');

async function startWorker() {
  try {
    const connection = await amqp.connect('amqp://localhost'); // Replace with your RabbitMQ server URL if not local
    const channel = await connection.createChannel();

    const exchange = 'user_events';

    // Assert the exchange
    await channel.assertExchange(exchange, 'direct', { durable: false });

    // Assert a queue
    const queue = 'user_operations';
    await channel.assertQueue(queue, { durable: true });

    // Bind the queue to the exchange
    channel.bindQueue(queue, exchange, '');

    console.log(`Worker listening for messages...`);

    // Consume messages
    channel.consume(queue, (msg) => {
      if (msg.content) {
        console.log(`Received message: ${msg.content.toString()}`);
        // Here you can log the message or process it further
      }
    }, { noAck: true });

  } catch (error) {
    console.error(error);
  }
}

startWorker();
