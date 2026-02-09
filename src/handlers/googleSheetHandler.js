require('dotenv').config()
const { google } = require('googleapis');
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

const serviceAccountAuth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
});

const sheets = google.sheets('v4');

function getInvoices() {
    let range = 'Base facturas!A1'
    return sheets.spreadsheets.values.get({
        auth: serviceAccountAuth,
        spreadsheetId: '1WhfsPE30_bs4UcozyVmf8tTcL9wTxuiHzqqMX3xihsc',
        range: range,
    })
    .then(res => {
        console.log('Data retrieved successfully:');
        return res.data;
    })
    .catch(err => {
        console.error('Error retrieving data from Google Sheets:', err);
        throw new Error(`Failed to get data for range "${range}": ${err.message}`); 
    });

}

function registerIncident(resArray) {
    console.log(resArray)
    let range = 'Incidentes!A1'
    //console.log(`arreglo final`, resArray);
    sheets.spreadsheets.values.append({
        auth: serviceAccountAuth,
        spreadsheetId: '1WhfsPE30_bs4UcozyVmf8tTcL9wTxuiHzqqMX3xihsc',
        range: range,
        valueInputOption: 'RAW',
        requestBody: {
            majorDimension: "ROWS",
            values: [resArray],
        }
    })
        .then(res => {
            console.log('Data sent to GS', res.status);
        })
        .catch(err => {
            console.log('Error saving date', err);
        });

}


module.exports = {
    getInvoices, registerIncident
}
