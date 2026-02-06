const messages = require("./messages");

const getResponse = (messageBody) => {
    const lowerMsg = messageBody.toLowerCase().trim();
    console.log('Received message:', lowerMsg);
    if (lowerMsg == 'cabify') {
        let text = formatText(messages.welcome);
        let list = formatList(messages.welcome_options);
        return [[text, 'text'], [list, 'interactive']];
    } else if (lowerMsg == 'dudas con plataforma') {
        let list = formatList(messages.douts_options);
        return [[list, 'interactive']];
    } else if (lowerMsg == 'cuenta bloqueada') {
        let text = formatText(messages.accountblocked);
        return [[text, 'text']];
    } else if (lowerMsg == 'carga de facturas') {
        let text = formatText(messages.billingupload);
        let list = formatList(messages.welcome_options);
        return [[text, 'text'], [list, 'interactive']];
    } else if (lowerMsg == '¿nuevo en la plataforma?') {
        let text = formatText(messages.newuser);
        let list = formatList(messages.welcome_options);
        return [[text, 'text'], [list, 'interactive']];
    } else if (lowerMsg == 'solicitud Plantilla') {
        let qr = formatQuickReplies(messages.plantillarequest);
        return [[qr, 'interactive']];
    } else if (lowerMsg == 'plantilla carga masiva') {
        let text = formatText(messages.masivepantilla);
        let list = formatList(messages.welcome_options);
        return [[text, 'text'], [list, 'interactive']];
    } else if (lowerMsg == 'plantilla politica de viaje') {
        let text = formatText(messages.travelpolicyplantilla);
        let list = formatList(messages.welcome_options);
        return [[text, 'text'], [list, 'interactive']];
    }else if (lowerMsg == 'login') {
        let text = formatText(messages.login);
        let list = formatList(messages.douts_options);
        return [[text, 'text'], [list, 'interactive']];
    }else if (lowerMsg == 'gestión usuarios y viaje') {
        let list = formatList(messages.usertravels_options);
        return [[list, 'interactive']];
    }else if (lowerMsg == 'gestión usuarios') {
        let text = formatText(messages.usermanagement);
        return [[text, 'text']];
    }else if (lowerMsg == 'politicas de viaje') {
        let text = formatText(messages.travelpolicy);
        return [[text, 'text']];
    }else if (lowerMsg == 'centro de coste') {
        let text = formatText(messages.costcenter);
        return [[text, 'text']];
    }else if (lowerMsg == 'reportes de viajes') {
        let text = formatText(messages.travelreports);
        return [[text, 'text']];
    }else if (lowerMsg == 'control de gastos') {
        let qr = formatQuickReplies(messages.expensecontrol_options);
        return [[qr, 'interactive']];
    }else if (lowerMsg == 'facturación') {
        let text = formatText(messages.billing);
        return [[text, 'text']];
    }else if (lowerMsg == 'canal de ayuda') {
        let qr = formatQuickReplies(messages.helpchannel_options);
        return [[qr, 'interactive']];
    }else if (lowerMsg == 'reporte incidencias') {
        let text = formatText(messages.incidentreport);
        let list = formatList(messages.douts_options);
        return [[text, 'text'], [list, 'interactive']];
    }else if (lowerMsg == 'certificado carbono') {
        let text = formatText(messages.carboncertificate);
        let list = formatList(messages.douts_options);
        return [[text, 'text'], [list, 'interactive']];
    }else if (lowerMsg == 'otros') {
        let text = formatText(messages.others);
        let list = formatList(messages.douts_options);
        return [[text, 'text'], [list, 'interactive']];
    }else {
        let text = formatText(messages.fallback);
        return [[text, 'text']];
    }
};

const removeLineBreaks = (text) => {
    return text.replace(/\n/g, '');
}

const formatText = (text) => {
    return JSON.stringify({ body: text });

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

const formatQuickReplies = (options) => {
    let menu = options.split(',').slice(0, 1);
    let optionsList = options.split(',').slice(1);
    let rows = [];
    for (let [index, option] of optionsList.entries()) {
        rows.push({
            "type": "reply",
            "reply": {
                "id": `UNIQUE_BUTTON_ID_${index + 1}`,
                "title": option.trim().slice(0, 20)
            }
        });
    }
    let quickReplies = {
        "type": "button",
        "body": { "text": menu[0] },
        "action": {
            "buttons": rows
        }
    }
    return removeLineBreaks(JSON.stringify(quickReplies));
}





module.exports = { getResponse };