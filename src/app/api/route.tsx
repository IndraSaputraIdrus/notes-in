import { getMessages, sendMessage } from "@/utils/bot";
import { decrypt, encrypt } from "@/utils/crypto";

export const GET = async (request: Request) => {
  const key = process.env.SECRET_KEY!;
  const iv = process.env.SECRET_IV!;
  const channelId = process.env.DISCORD_CHANNEL_ID!

  const newMessage = encrypt("ini adalah item ke tiga", key, iv)

  await sendMessage(channelId, newMessage)

  return Response.json({message: "Hello world"});
};
