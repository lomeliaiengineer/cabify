const axios = require('axios');
const appId = process.env.APP_ID;
const phoneNumberId = process.env.PHONE_NUMBER_ID;
const partnerToken = process.env.PARTNER_TOKEN;


const sendMessage = async (to, message, type) => {
    const url = `https://partner.gupshup.io/partner/app/${appId}/v3/message`;
    const data = `messaging_product=whatsapp&recipient_type=individual&source=${phoneNumberId}&to=${to}&type=${type}&${type}=${message}`;

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': partnerToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(data)
        console.log('Message sent successfully:', message,response.data);
        return true;
    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
        return false;
    }
};

module.exports = { sendMessage };