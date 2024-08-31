const express = require('express');
const redis = require('redis');
const http = require('http');
const socketIo = require('socket.io');
const { Kafka } = require('kafkajs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const kafka = new Kafka({
    clientId: 'Click-Counter',
    brokers: ['localhost:9092']
});
const producer = kafka.producer();
const redisClient = redis.createClient();

const run = async () => {
    await producer.connect();
    await redisClient.connect();

    app.use(express.static('public'));

    app.post('/track-click', async (req, res) => {
        try {
            await producer.send({
                topic: 'user-activity',
                messages: [{ value: 'User clicked somewhere on the page' }]
            });
            res.sendStatus(200);
        } catch (error) {
            console.error('Error sending click event to Kafka:', error);
            res.sendStatus(500);
        }
    });

    io.on('connection', (socket) => {
        console.log('Client connected');

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

        setInterval(async () => {
            try {
                const count = await redisClient.get('user-activity-count');
                socket.emit('update', { userActivityCount: count || 0 });
            } catch (err) {
                console.error('Error fetching user-activity-count:', err);
            }
        }, 1000);
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

run().catch(console.error);

process.on('SIGINT', async () => {
    await producer.disconnect();
    await redisClient.quit();
    process.exit(0);
});
