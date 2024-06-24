const mysql = require('mysql');
const util = require('util');

// Database configuration from environment variables
const db_config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "bharat_drone"
};

let connection;
let exe;

function handleDisconnect() {
    connection = mysql.createConnection(db_config);

    connection.connect((err) => {
        if (err) {
            console.error('Error when connecting to DB:', err);
            setTimeout(handleDisconnect, 2000); // Reconnect after 2 seconds
        } else {
            console.log("Connected to the database.");
        }
    });

    connection.on('error', (err) => {
        console.error('DB error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') {
            handleDisconnect(); // Reconnect on connection loss
        } else {
            throw err; // Throw errors other than connection loss
        }
    });

    // Promisify the query method for convenience
    exe = util.promisify(connection.query).bind(connection);
}

// Initialize the connection handling
handleDisconnect();

// Export the promisified query function
module.exports = exe;