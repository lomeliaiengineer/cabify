const fs = require("fs").promises;
const path = require('path');

const SESSION_FILE = path.join(__dirname, '..', 'utils', 'session.json');

const readFile = async () => {
    try {
        const file = await fs.readFile(SESSION_FILE, "utf8");
        const jsonData = JSON.parse(file);
        const sessions = jsonData.sessions;
        return jsonData;
    }
    catch (error) {
        console.error(error);
        return;
    }
};


const editFile = async (phone, name, el) => {
    const file = await fs.readFile(SESSION_FILE, "utf8");
    const jsonData = JSON.parse(file);
    console.log('Current JSON data:', jsonData);
    const sessions = jsonData.sessions;
    if (sessions[phone] == undefined) {
        sessions[phone] = {};
    }

    console.log(sessions[phone])
    Object.assign(sessions[phone], { [name]: el });
    console.log(sessions[phone])

    // // Update the JSON data
    jsonData.sessions = sessions;
    console.log(sessions)
    // // Write the updated JSON data back to the file
    try {
        const file = await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
        console.log("JSON file updated successfully!");
    }
    catch (err) {
        console.error(err);
        return;
    }

}

const emptySession = async (phone) => {
    const jsonData = await fs.readFile(SESSION_FILE, "utf8");
    const sessions = jsonData.sessions;
    console.log('entro', sessions[phone])

    sessions[phone] = {};
    console.log(sessions[phone])
    // // Update the JSON data
    jsonData.sessions = sessions;
    console.log(sessions)
    // // Write the updated JSON data back to the file
    try {
        const file = await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
        console.log("JSON file updated successfully!");
    }
    catch (err) {
        console.error(err);
        return;
    }



}


module.exports = { readFile, editFile, emptySession }