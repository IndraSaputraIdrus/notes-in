import { getMessages } from "@/lib/bot";
import { decryptContent } from "@/lib/parse";
import Card from "@/components/card";
import Link from "next/link";

export default async function Home() {
  const channelId = process.env.DISCORD_CHANNEL_ID!;
  const data = await getMessages(channelId);

  if (!data) throw new Error("Messages not found");

  return (
    <div className="min-h-dvh container mx-auto py-10 px-4">
      <h1 className="text-2xl mb-5 font-semibold">My notes</h1>

      <ul className="grid grid-cols-1 gap-4 sm:gridllols-3 md:grid-cols-4">
        {data.map((item) => (
          <li key={item.id}>
            <Link
              className="block w-full h-full transition duration-200 ease-in-out hover:opacity-50"
              href={`/detail/${item.id}`}
            >
              <Card>
                <p className="text-lg mb-3 font-bold">{item.author.username}</p>
                <p>{decryptContent(item.content)}</p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
