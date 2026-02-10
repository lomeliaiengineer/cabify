const messages = require("../utils/messages");
const { getInvoices, registerIncident } = require("./googleSheetHandler");
const { editFile } = require("./sessionHandler");


const getResponse = async (messageBody, from, context) => {
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
        await editFile(from, 'askRUC', 'yes');
        return [[text, 'text']];
    } else if (context.askRUC == 'yes') {
        let invoices = await getInvoicesByRUC(lowerMsg);
        let text = formatText(messages.invoinces(formatInvoiceMessage(invoices)));
        console.log(text)
        await editFile(from, 'askRUC', 'done');
        return [[text, 'text']];
    } else if (lowerMsg == 'incidente') {
        let text = formatText(messages.askIncident);
        await editFile(from, 'askIncident', 'yes');
        return [[text, 'text']];
    } else if (context.askIncident == 'yes') {
        await saveIncident(lowerMsg);
        let text = formatText(messages.invoiceincident);
        await editFile(from, 'askIncident', 'done');
        return [[text, 'text']];
    } else if (lowerMsg == 'carga de facturas') {
        let text = formatText(messages.billingupload);
        let list = formatList(messages.welcome_options);
        return [[text, 'text'], [list, 'interactive']];
    } else if (lowerMsg == '¿nuevo en la plataforma?') {
        let text = formatText(messages.newuser);
        let list = formatList(messages.welcome_options);
        return [[text, 'text'], [list, 'interactive']];
    } else if (lowerMsg == 'solicitud plantilla') {
        let qr = formatQuickReplies(messages.plantillarequest);
        return [[qr, 'interactive']];
    } else if (lowerMsg == 'carga masiva') {
        let text = formatText(messages.masivepantilla);
        let list = formatList(messages.welcome_options);
        return [[text, 'text'], [list, 'interactive']];
    } else if (lowerMsg == 'politica de viaje') {
        let text = formatText(messages.travelpolicyplantilla);
        let list = formatList(messages.welcome_options);
        return [[text, 'text'], [list, 'interactive']];
    } else if (lowerMsg == 'login') {
        let qr = formatQuickReplies(messages.login);
        return [[qr, 'interactive']];
    } else if (lowerMsg == 'desde el celular') {
        let video = formatVideo(messages.loginapp);
        return [[video, 'video']];
    }else if (lowerMsg == 'desde la computadora') {
        let video = formatVideo(messages.loginweb);
        return [[video, 'video']];
    }else if (lowerMsg == 'gestión usuarios y viaje') {
        let list = formatList(messages.usertravels_options);
        return [[list, 'interactive']];
    } else if (lowerMsg == 'gestión usuarios') {
        let text = formatText(messages.usermanagement);
        let video = formatVideo(messages.newuservideo);
        return [[text, 'text'], [video, 'video']];
    }else if (lowerMsg == 'politicas de viajes') {
        let text = formatText(messages.travelpolicy);
        return [[text, 'text']];
    } else if (lowerMsg == 'centro de coste') {
        let text = formatText(messages.costcenter);
        return [[text, 'text']];
    } else if (lowerMsg == 'reportes de viajes') {
        let text = formatText(messages.travelreports);
        return [[text, 'text']];
    } else if (lowerMsg == 'control de gastos') {
        let qr = formatQuickReplies(messages.expensecontrol_options);
        return [[qr, 'interactive']];
    } else if (lowerMsg == 'facturación') {
        let text = formatText(messages.billing);
        let video = formatVideo(messages.billingvideo);
        return [[text, 'text'], [video, 'video']];
    } else if (lowerMsg == 'canal de ayuda') {
        let qr = formatQuickReplies(messages.helpchannel_options);
        return [[qr, 'interactive']];
    } else if (lowerMsg == 'reporte incidencias') {
        let text = formatText(messages.incidentreport);
        let video = formatVideo(messages.incidentvideo);
        return [[text, 'text'], [video, 'video']];
    } else if (lowerMsg == 'certificado carbono') {
        let text = formatText(messages.carboncertificate);
        return [[text, 'text']];
    } else if (lowerMsg == 'otros') {
        let text = formatText(messages.others);
        return [[text, 'text']];
    } else if (lowerMsg == 'menu') {
        let list = formatList(messages.welcome_options);
        return [[list, 'interactive']];
    } else {
        let text = formatText(messages.fallback);
        return [[text, 'text']];
    }
};

const getInvoicesByRUC = async (ruc) => {
    const data = await getInvoices();
    return data.values.filter(row => row[2] === ruc);
}

const saveIncident = async (incidents) => {
    let array = incidents.split(',');
    await registerIncident(array);
}


const formatInvoiceMessage = (invoices) => {
    if (invoices.length === 0) {
        return 'No hemos encontrado facturas pendientes de pago asociadas a tu RUC. Si crees que esto es un error, por favor contáctanos para ayudarte a resolverlo.';
    } else {
        let invoiceMsg = "";
        invoices.forEach(invoice => {
            invoiceMsg += `Factura ${invoice[18]} por un monto de ${invoice[26]} soles, con estado de pago: ${invoice[30]}.\n`;
        })
        console.log(invoiceMsg);
        return invoiceMsg;
    }
}

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

const formatVideo = (data) => {
    let details = data.split(',');
    let video = { "id": details[0], "caption": details[1] }
    return JSON.stringify(video);
}




module.exports = { getResponse };