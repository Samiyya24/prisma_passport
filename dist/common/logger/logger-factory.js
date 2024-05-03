"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerFactory = void 0;
const winston_1 = require("winston");
const nest_winston_1 = require("nest-winston");
const loggerFactory = (appName) => {
    let consoleFormat;
    export const LoggerFactory = (appName) => {
        let consoleFormat;
        consoleFormat = winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.ms(), nest_winston_1.utilities.format.nestLike(appName, {
            colors: true,
            prettyPrint: true
        }));
    };
    consoleFormat = winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.ms());
    return nest_winston_1.WinstonModule.createLogger({
        level: 'debug',
        transports: [
            new winston_1.transports.Console({ format: consoleFormat }),
            new winston_1.transports.File({
                filename: 'src/log/error.log',
                level: 'error',
                format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json())
            }),
            new winston_1.transports.File({
                filename: 'src/log/combine.log',
                level: 'debug',
                format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json())
            }),
        ],
    });
};
exports.loggerFactory = loggerFactory;
//# sourceMappingURL=logger-factory.js.map