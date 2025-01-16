import { decrypt } from "./crypto";

export function decryptContent(value: string) {
  return decrypt(value, process.env.SECRET_KEY!, process.env.SECRET_IV!);
}
