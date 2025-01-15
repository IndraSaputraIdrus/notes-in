import { getMessages } from "@/utils/bot";
import { decrypt } from "@/utils/crypto";
import type { Message } from "@/utils/types";

async function getAllMessages(): Promise<Message[]> {
  const key = process.env.SECRET_KEY!
  const iv = process.env.SECRET_IV!
  const channelId = process.env.CHANNEL_ID!

  const messages = await getMessages(channelId);
  if (!messages) throw new Error("message not found");

  let result: Message[] = [];

  for (const message of messages.values()) {
    result.push({
      id: message.id,
      author: {
        id: message.author.id,
        username: message.author.username,
      },
      content: decrypt(message.content, key, iv),
      attachments: [],
      createTimestamp: message.createdTimestamp,
    });
  }

  return result;
}

export default async function Home() {
  const data = await getAllMessages();

  return (
    <div className="min-h-dvh container mx-auto py-10 px-4">
      <h1 className="text-2xl mb-5 font-semibold">My notes</h1>

      <ul className="grid grid-cols-4 gap-4">
        {data.map((item) => (
          <li key={item.id} className="border border-white rounded p-4">
            <p className="text-lg mb-3 font-bold">{item.author.username}</p>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
