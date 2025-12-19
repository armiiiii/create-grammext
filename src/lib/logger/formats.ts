import winston, { format } from "winston"

const { combine, timestamp, printf, json, errors } = format

export const defaultFormat = combine(
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  errors({ stack: true }),
  winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] })
)

export const telegramFormat = printf(({ level, message, timestamp, userId, chatId, updateType }) => {
  const emoji = {
    error: '🔴',
    warn: '🟡',
    info: '🔵',
    debug: '⚪'
  }[level] || '⚫';
  
  return `${emoji} [${timestamp}] ${level.toUpperCase()} ${
    userId ? `[USER:${userId}]` : ''
  }${
    chatId ? `[CHAT:${chatId}]` : ''
  }${
    updateType ? `[UPDATE:${updateType}]` : ''
  } ${message}`;
})

export const jsonFormat = combine(
  timestamp(),
  errors({ stack: true }),
  json({
    space: 2,
    replacer: (key, value) => {
      if (key === 'password' || key === 'token') return '[REDACTED]';
      return value;
    }
  })
)