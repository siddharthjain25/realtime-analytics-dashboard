const { Kafka } = require('kafkajs');
const kafka = new Kafka({
    clientId: 'Click-Counter',
    brokers: ['localhost:9092']
});

const producer = kafka.producer();

const run = async () => {
    await producer.connect();
    setInterval(async () => {
        await producer.send({
            topic: 'user-activity',
            messages: [{ value: 'User1 viewed page' }]
        });
    }, 5000);
};

run().catch(console.error);
