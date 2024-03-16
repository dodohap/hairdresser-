import * as winston from "winston";

// Konfiguracja loggera
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.json()
  ),
  defaultMeta: { service: "user-service" },
  // transports: [
  //   new winston.transports.File({
  //     filename: "error.log",
  //     level: "error",
  //     format: winston.format.json(),
  //   }),
  //   new winston.transports.File({
  //     filename: "combined.log",
  //     format: winston.format.json(),
  //   }),
  // ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  })
);

export default logger;
