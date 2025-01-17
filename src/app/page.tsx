import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getMessages } from "@/lib/bot";
import { formatDate } from "@/lib/utils";
import { decryptContent } from "@/lib/parse";
import { Plus } from "lucide-react";

export default async function Home() {
  const channelId = process.env.DISCORD_CHANNEL_ID!;
  const data = await getMessages(channelId);

  if (!data) throw new Error("Messages not found");

  return (
    <div className="min-h-dvh max-w-xl mx-auto py-10 px-4">
      <div className="flex items-center gap-5 mb-5">
        <h1 className="text-2xl font-semibold">My notes</h1>
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
      </div>

      <ul className="grid grid-cols-1 gap-5">
        {data.map((item) => (
          <li key={item.id}>
            <Card>
              <CardHeader>
                <CardTitle>{item.author.username}</CardTitle>
                <CardDescription>
                  {formatDate(item.createdTimestamp)}
                </CardDescription>
              </CardHeader>
              <CardContent className="max-w-sm truncate">
                {decryptContent(item.content)}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
