import { Bot, BotError } from "grammy"
import { config } from "./config.ts"
import logger from "logger"
import { logRequestMiddleware } from "middleware/logging.ts"

const createBot = (): Bot => {
  logger.debug('Creating bot instace')
  const bot = new Bot(config.API_TOKEN)
  logger.debug('Bot instance created succesfully')
  return bot
}

const logBotCreationError = (err: unknown) => {
  if (err instanceof Error || err instanceof BotError) {
    logger.error(`Failed to create bot instance due to an error, ${err.message}`, err)
  } else {
    logger.error('Unknown error during bot instance creation', err)
  }
}

const applyMiddlewares = (bot: Bot) => {
  logger.debug('Applying middlewares to bot instance')
  
  bot.catch((err) => {
    logger.error('Error in bot', err)
  })

  bot.use(logRequestMiddleware)

  logger.debug('Applied middlewares successfully')
}

const applyCommands = (bot: Bot) => {
  logger.debug('Applying commands to bot instance')

  bot.on('message', async (ctx) => {
    const json = `\`\`\`json\n${JSON.stringify(ctx, null, 2)}\`\`\``
    await ctx.reply(json, {parse_mode: 'MarkdownV2'})
  })

  logger.debug('Applied commands successfully')
}

const logStartupError = (err: unknown) => {
  if (err instanceof Error || err instanceof BotError) {
    logger.error(`Failed to start bot due to an error, ${err.message}`, err)
  } else {
    logger.error('Unknown error during bot startup', err)
  }
}

(() => {

  let bot: Bot

  try {
    bot = createBot()
  } catch (err) {
    logBotCreationError(err)
    return
  }

  logger.debug('Performing configuration to bot instance...')

  applyMiddlewares(bot)
  applyCommands(bot)

  logger.debug('Configuration done. Starting bot.')

  try {
    bot.start()
    logger.info('Bot has started')
  } catch (err) {
    logStartupError(err)
    return
  }
})()

