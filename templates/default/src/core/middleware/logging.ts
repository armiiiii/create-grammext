import { Context, NextFunction } from "grammy"
import logger from "logger"
import { isUserContext } from "utils"

export async function logRequestMiddleware(ctx: Context, next: NextFunction) {
  const timestamp = Date.now()
  if (isUserContext(ctx)) {
    logger.debug(`Request from user ${ctx.from.id}`)
  } else {
    logger.warn(`Request from group chat ${ctx.chat?.id}`)
  }
  await next()
  logger.debug(`Request ended within ${Date.now() - timestamp}s`)
}
