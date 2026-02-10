const fs = require("fs").promises;
const path = require('path');

const SESSION_FILE = path.join(__dirname, '..', 'utils', 'session.json');

const readFile = async () => {
    try {
        const file = await fs.readFile(SESSION_FILE, "utf8");
        const jsonData = JSON.parse(file);
        return jsonData;
    }
    catch (error) {
        console.error(error);
        return;
    }
};


const editFile = async (phone, name, el) => {
    try {
        const file = await fs.readFile(SESSION_FILE, "utf8");
        const jsonData = JSON.parse(file);
        const sessions = jsonData.sessions;
        if (sessions[phone] == undefined) {
            sessions[phone] = {};
        }
        Object.assign(sessions[phone], { [name]: el });
        jsonData.sessions = sessions;
        await fs.writeFile(SESSION_FILE, JSON.stringify(jsonData, null, 2));
        console.log("JSON file updated successfully!");
    }
    catch (err) {
        console.error(err);
        return;
    }

}

const emptySession = async (phone) => {
    try {
        const jsonData = await fs.readFile(SESSION_FILE, "utf8");
        const sessions = jsonData.sessions;
        sessions[phone] = {};
        jsonData.sessions = sessions;
        await fs.writeFile(SESSION_FILE, JSON.stringify(jsonData, null, 2));
        console.log("JSON file emptied successfully!");
    }
    catch (err) {
        console.error(err);
        return;
    }



}


module.exports = { readFile, editFile, emptySession }