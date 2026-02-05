const getResponse = (messageBody) => {
    const lowerMsg = messageBody.toLowerCase();
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        return 'Hello! How can I help you today?';
    } else if (lowerMsg.includes('bye')) {
        return 'Goodbye! Have a great day!';
    } else {
        return `Echo: ${messageBody}`;
    }
};

module.exports = { getResponse };