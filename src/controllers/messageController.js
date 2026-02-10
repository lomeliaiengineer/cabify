const whatsappService = require('../services/whatsappService');
const responseHandler = require('../handlers/responseHandler');
const { editFile, readFile } = require('../handlers/sessionHandler');

const handleMessage = async (req, res) => {
    const body = req.body;
    let callback = body?.entry?.[0]?.changes?.[0]?.value?.statuses?.[0]?.type;
    if (callback === 'set-callback') {
        res.status(200).send('Callback set successfully');
        return;
    }
    let type = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.type;
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
    const session = file.sessions[from];
    if (session == undefined) {
        await editFile(from, 'name', 'user')
    }
    let response = await responseHandler.getResponse(msgbody, from, session);

    if (response.length > 1) {
        response.forEach(async (resp) => {
            await whatsappService.sendMessage(from, ...resp);
        });
    } else {
        whatsappService.sendMessage(from, ...response[0]);
    }
    res.send('OK');

};

module.exports = { handleMessage };