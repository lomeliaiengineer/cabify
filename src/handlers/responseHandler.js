const messages = require("./messages");

const getResponse = (messageBody) => {
    const lowerMsg = messageBody.toLowerCase();
    if (lowerMsg == 'cabify') {
        let text = formatText(messages.welcome);
        let list = formatList(messages.welcome_options);
        return [[text, 'text'], [list, 'interactive']];
    } else if (lowerMsg.includes('bye')) {
        return 'Goodbye! Have a great day!';
    } else {
        return `Echo: ${messageBody}`;
    }
};

const removeLineBreaks = (text) => {
    return text.replace(/\n/g, '');
}

const formatText = (text) => {
    return { body: text };
}

const formatList = (options) => {
    let menu = options.split(',').slice(0, 4);
    let optionsList = options.split(',').slice(4);
    let rows = [];
    for (let [index, option] of optionsList.entries()) {
        rows.push({
            "id": `SECTION_1_ROW_${index + 1}_ID`,
            "title": option.slice(0, 24),
            "description": ""
        });
    }

    let list = {
        "type": "list",
        "header": { "type": "text", "text": menu[0] },
        "body": { "text": menu[1] },
        "footer": { "text": menu[2] },
        "action": {
            "button": menu[3],
            "sections": [
                {
                    "title": "Opciones",
                    "rows": rows
                }
            ]
        }
    };
    return removeLineBreaks(JSON.stringify(list));
}



module.exports = { getResponse };