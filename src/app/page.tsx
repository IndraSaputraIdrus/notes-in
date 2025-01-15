import { getMessages } from "@/utils/bot";
import { decryptContent } from "@/utils/parse";
import Link from "next/link";

export default async function Home() {
  const channelId = process.env.DISCORD_CHANNEL_ID!;
  const data = await getMessages(channelId);

  if (!data) throw new Error("Messages not found");

  return (
    <div className="min-h-dvh container mx-auto py-10 px-4">
      <h1 className="text-2xl mb-5 font-semibold">My notes</h1>

      <ul className="grid grid-cols-4 gap-4">
        {data.map((item) => (
          <li
            key={item.id}
            className="border border-white rounded p-4 cursor-pointer transition hover:border-blue-500"
          >
            <Link className="block w-full h-full" href={`/detail/${item.id}`}>
              <p className="text-lg mb-3 font-bold">{item.author.username}</p>
              <p>{decryptContent(item.content)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
