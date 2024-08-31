const { Kafka } = require('kafkajs');
const redis = require('redis');
const kafka = new Kafka({
    clientId: 'Click-Counter',
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'click-group' });
const redisClient = redis.createClient();

const run = async () => {
    try {
        await redisClient.connect();
        await consumer.connect();
        await consumer.subscribe({ topic: 'user-activity', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ message }) => {
                const activity = message.value.toString();
                console.log(`Received: ${activity}`);
                if (activity.includes('clicked')) {
                    await redisClient.incr('user-activity-count');
                    console.log('Incremented user-activity-count');
                }
            },
        });
    } catch (err) {
        console.error('Error in Kafka consumer:', err);
    }
};

run().catch(console.error);

process.on('SIGINT', async () => {
    await consumer.disconnect();
    await redisClient.quit();
    process.exit(0);
});
