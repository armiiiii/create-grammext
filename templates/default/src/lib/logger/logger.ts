import winston from "winston"
import { TextFileTrasnport, JsonFileTransport, ConsoleTransport } from "./transports.ts"
import { defaultFormat } from "./formats.ts"


const logger = winston.createLogger({
  level: 'debug',
  format: defaultFormat,
  transports: [
    ConsoleTransport,
    JsonFileTransport,
    TextFileTrasnport
  ]
})

export default logger