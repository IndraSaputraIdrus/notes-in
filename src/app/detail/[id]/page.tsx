import { getMessage } from "@/utils/bot";
import { decryptContent } from "@/utils/parse";

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
      <h1>Detail</h1>
      <p>{data.author.username}</p>
      <p>{decryptContent(data.content)}</p>
      <p>{new Date(data.createdTimestamp).toLocaleString("en-US")}</p>
    </div>
  );
}
