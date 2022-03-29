require('dotenv').config();
const http = require('http');
const app = require('./app/app');
const db = require('./db/db');

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

db.then(() => {
    server.listen(PORT, () => {
        console.log(`Server is listening on PORT ${PORT}`);
    })
    console.log("Database is Connected");
})



module.exports = server;