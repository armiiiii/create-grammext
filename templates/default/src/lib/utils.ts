import { Context } from "grammy"
import { Chat } from "grammy/types"

export function isUserContext(ctx: Context): ctx is Context & {
  chat: Chat.PrivateChat;
  from: NonNullable<Context['from']>;
} {
  return !!ctx.chat && ctx.chat.type === 'private' && !!ctx.from;
}