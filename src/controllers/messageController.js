const whatsappService = require('../services/whatsappService');
const responseHandler = require('../handlers/responseHandler');
const messages = require('../handlers/messages');

const handleMessage = async (req, res) => {
    const body = req.body;
    let from = body.entry[0].changes[0].value.messages[0].from;
    let msgbody = body.entry[0].changes[0].value.messages[0].text.body;
    console.log('request body:', JSON.stringify(body.entry[0].changes[0].value.messages[0]));
    if(msgbody == "Cabify"){
    whatsappService.sendMessage(from, messages.welcome);
    }
    res.send('OK');
    // if (body.object) {
    //     if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages) {
    //         const message = body.entry[0].changes[0].value.messages[0];
    //         const from = message.from;
    //         const msg_body = message.text.body;

    //         // Generate response based on message content
    //         const responseText = responseHandler.getResponse(msg_body);

    //         // Send the response
    //         const sent = await whatsappService.sendMessage(from, responseText, 'text');
    //         if (!sent) {
    //             console.error('Failed to send message to', from);
    //         }
    //     }
    //     res.sendStatus(200);
    // } else {
    //     res.sendStatus(404);
    // }
};

module.exports = { handleMessage };