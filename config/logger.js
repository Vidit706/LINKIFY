const winston = require("winston/lib/winston/config");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({level: "debug"}),
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
    ],
});

process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception", err);
    logger.on("finish", () => {
        process.exit(1);
    });
})