import Card from "@/components/card";
import { getMessage } from "@/lib/bot";
import { decryptContent } from "@/lib/parse";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DetailsPage({ params }: Props) {
  const id = (await params).id;
  const channelId = process.env.DISCORD_CHANNEL_ID!;

  const data = await getMessage(channelId, id);

  if (!data) throw new Error("Message not found");

  return (
    <div className="min-h-dvh container mx-auto py-10 px-5">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-semibold mb-5">Detail</h1>
        <Card className="p-4">
          <h2 className="text-3xl">{data.author.username}</h2>
          <p className="text-xl">{decryptContent(data.content)}</p>
          <p>{new Date(data.createdTimestamp).toLocaleString("en-US")}</p>
        </Card>
      </div>
    </div>
  );
}
