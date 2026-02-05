# WhatsApp Bot API

A scalable and easy-to-edit WhatsApp bot using Node.js and the official WhatsApp Business API.

## Features

- Receives and responds to WhatsApp messages via webhooks
- Modular structure for easy extension
- Environment-based configuration

## Setup

1. Set up a WhatsApp Business Account and get API credentials from [Facebook Developers](https://developers.facebook.com/docs/whatsapp/).

2. Update the `.env` file with your:
   - VERIFY_TOKEN
   - ACCESS_TOKEN
   - PHONE_NUMBER_ID

3. Install dependencies:
   ```
   npm install
   ```

4. Run the server:
   ```
   npm start
   ```

5. Set up the webhook URL in your WhatsApp Business dashboard to `https://yourdomain.com/webhook`.

## Structure

- `src/app.js`: Main Express application
- `src/routes/webhook.js`: Webhook routes for verification and message handling
- `src/controllers/messageController.js`: Logic for processing incoming messages
- `src/services/whatsappService.js`: Service for sending messages via WhatsApp API
- `src/config/`: Configuration files (if needed)

## Scalability

- Use a database (e.g., MongoDB) for storing conversation state
- Deploy with PM2 for clustering
- Use message queues for high-volume processing
- Containerize with Docker

## Editing

- Add new message handlers in `controllers/`
- Extend services in `services/`
- Add routes in `routes/`
- Keep business logic separate from API logic