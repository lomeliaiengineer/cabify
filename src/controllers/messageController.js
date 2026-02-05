const whatsappService = require('../services/whatsappService');
const responseHandler = require('../handlers/responseHandler');

const handleMessage = async (req, res) => {
    const body = req.body;
    console.log(body);
    whatsappService.sendMessage('584144197764', 'Hola, este es un mensaje de prueba desde Cabify Bot');
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