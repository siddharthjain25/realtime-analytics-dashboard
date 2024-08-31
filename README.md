# Real-Time Analytics Dashboard

## Overview

This project is a real-time analytics dashboard that tracks and displays user activity on a webpage. It uses Kafka for event streaming, Redis for storing user activity counts, and Node.js with Express for server-side operations. The dashboard updates in real-time to reflect the number of user clicks on the page.

## Project Structure

- `server.js`: Node.js server that serves the frontend, handles click events, and manages WebSocket connections for real-time updates.
- `kafkaConsumer.js`: Kafka consumer that processes user activity events from Kafka and updates Redis with the latest counts.
- `public/index.html`: Frontend HTML page that captures user clicks and displays real-time analytics.
- `public/script.js`: JavaScript file included in `index.html` for handling click events and updating the dashboard.

## Requirements

- [Node.js](https://nodejs.org/) (v16 or later)
- [Kafka](https://kafka.apache.org/)
- [Redis](https://redis.io/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/siddharthjain25/realtime-analytics-dashboard.git
   cd realtime-analytics-dashboard

2. **Install dependencies:**

   ```bash
   npm install

3. **Set up Kafka and Redis:**

   Ensure Kafka and Redis servers are running. Adjust the configuration in the code if your Kafka and Redis instances are not running on the default ports.

## Running the Project

1. **Start the Kafka consumer:**

   ```bash
   node kafkaConsumer.js

2. **Start the Node.js server:**

   ```bash
   node server.js
   
3. **Open the dashboard:**

   Navigate to http://localhost:3000 in your web browser to view the real-time analytics dashboard.

## How It Works
1. Click Tracking: User clicks anywhere on the webpage are captured by JavaScript and sent to the server via a POST request to the /track-click endpoint.
2. Event Processing: The server sends these click events to a Kafka topic named user-activity.
3. Data Storage: The Kafka consumer processes events from the user-activity topic and increments the user activity count in Redis.
4. Real-Time Updates: The server uses WebSocket to push updated user activity counts to the frontend, which is displayed in real-time on the dashboard.

## Example Usage
1. **Click Tracking:**

   Each time a user clicks on the webpage, the click event is sent to Kafka.
   The click event is recorded as "User clicked somewhere on the page".
   
2. **Real-Time Dashboard:**

   The user activity count is updated every second and reflected in the UI.
   A line chart visualizes the activity over time.

## Acknowledgments
   Kafka for streaming data.
   Redis for in-memory data storage.
   Chart.js for the data visualization.