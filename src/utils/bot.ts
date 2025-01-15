import { Client, Guild, GatewayIntentBits, ChannelType } from "discord.js";

const TOKEN = process.env.DISCORD_BOT_TOKEN!;

let client: Client | null = null;
let clientReady = false;

export async function getClient() {
  if (!client) {
    client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });

    client.once("ready", () => {
      console.log(`logged in ${client!.user?.tag}`);
      clientReady = true;
    });

    await client.login(TOKEN);
  }

  if (!clientReady) {
    await new Promise<void>((resolve) => {
      client!.once("ready", () => {
        resolve();
      });
    });
  }

  return client;
}

export async function sendMessage(channelId: string, content: string) {
  const client = await getClient();
  const guild = await getGuild(client);
  const channel = guild.channels.cache.get(channelId);
  if (!channel || channel.type !== ChannelType.GuildText) {
    return null;
  }

  try {
    return await channel.send(content);
  } catch (error) {
    console.error("Error sending message", error);
    return null;
  }
}

export async function getMessages(channelId: string) {
  const client = await getClient();
  const guild = await getGuild(client);
  const channel = guild.channels.cache.get(channelId);
  if (!channel || channel.type !== ChannelType.GuildText) return null;

  const messages = await channel.messages.fetch({ limit: 10 });
  if (!messages) return null;

  return messages;
}

export async function getGuild(client: Client): Promise<Guild> {
  const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID!);
  if (!guild) throw new Error("Guild not found");
  return guild;
}
