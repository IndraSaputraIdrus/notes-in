export interface Message {
  id: string;
  author: {
    id: string;
    username: string;
  };
  content: string;
  attachments: unknown[];
  createTimestamp: number;
}
