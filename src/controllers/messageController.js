const whatsappService = require('../services/whatsappService');
const responseHandler = require('../handlers/responseHandler');
const messages = require('../handlers/messages');

const handleMessage = async (req, res) => {
    const body = req.body;
    let from = body.entry[0].changes[0].value.messages[0].from;
    let msgbody = body.entry[0].changes[0].value.messages[0].text.body;
    console.log('request body:', JSON.stringify(body.entry[0].changes[0].value.messages[0]), msgbody);

    let response = responseHandler.getResponse(msgbody);

    if (response.length > 1) {
        response.forEach(async (resp) => {
            await whatsappService.sendMessage(from, ...resp);
        });
    } else {
        whatsappService.sendMessage(from, ...response);
    }
    res.send('OK');

};

module.exports = { handleMessage };