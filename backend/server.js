const config = require("./config");
const http = require("http");
const app = require("./app");

/**
 * Retourne un port valide
 * @param { String | Number } val
 * @return {{ String | Number | Boolean }}
 */
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

/**
 * Gère les erreurs liées au port écouté
 * @param { Error } error
 */
const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const port = normalizePort(config.appPort || "3000");

app.set("port", port);

const server = http.createServer(app);

server.on("error", errorHandler);

server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
});

server.listen(port);
