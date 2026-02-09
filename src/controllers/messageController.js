const whatsappService = require('../services/whatsappService');
const responseHandler = require('../handlers/responseHandler');
const { editFile } = require('../handlers/sessionHandler');

const handleMessage = async (req, res) => {
    const body = req.body;

    let type = body.entry[0].changes[0].value.messages[0].type;
    let msgbody = '';
    if (type === 'text') {
        msgbody = body.entry[0].changes[0].value.messages[0].text.body;
    } else if (type === 'interactive') {
        if (body.entry[0].changes[0].value.messages[0].interactive.type === 'list_reply') {
            msgbody = body.entry[0].changes[0].value.messages[0].interactive.list_reply.title;
        }
        else if (body.entry[0].changes[0].value.messages[0].interactive.type === 'button_reply') {
            msgbody = body.entry[0].changes[0].value.messages[0].interactive.button_reply.title;
        }
    }
    let from = body.entry[0].changes[0].value.messages[0].from;
    const file = await readFile();
    const session = file.sessions[phone];
    if (session == undefined) {
        await editFile(phone, 'name', userName)
    }
    let response = responseHandler.getResponse(msgbody, from, session);


    if (response.length > 1) {
        response.forEach(async (resp) => {
            await whatsappService.sendMessage(from, ...resp);
        });
    } else {
        console.log('Single response:', response);
        whatsappService.sendMessage(from, ...response[0]);
    }
    res.send('OK');

};

module.exports = { handleMessage };