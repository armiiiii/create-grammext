import winston, { format } from "winston";

import { jsonFormat, telegramFormat } from "./formats.ts"

const { timestamp, printf, combine, colorize } = format

export const ConsoleTransport = new winston.transports.Console({
  format: combine(
    colorize(),
    telegramFormat
  )
})

export const JsonFileTransport = new winston.transports.File({
  filename: 'logs/bot.json',
  format: jsonFormat,
  maxsize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5
})

export const TextFileTrasnport = new winston.transports.File({
  filename: 'logs/errors.log',
  level: 'error',
  format: combine(
    timestamp(),
    printf(({ timestamp, level, message, stack }) => {
      return `[${timestamp}] ${level}: ${message}\n${JSON.stringify(stack, null) || ''}`;
    })
  )
})