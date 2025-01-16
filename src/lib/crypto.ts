import crypto from "node:crypto";

const algorithm = "aes-256-cbc";

function generateKeyFromString(password: string, length: number) {
  return crypto
    .createHash("sha256")
    .update(password)
    .digest("hex")
    .substring(0, length);
}

export function encrypt(value: string, secretKey: string, secretIv: string) {
  const key = generateKeyFromString(secretKey, 32);
  const iv = generateKeyFromString(secretIv, 16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(value, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
}

export function decrypt(value: string, secretKey: string, secretIv: string) {
  const key = generateKeyFromString(secretKey, 32);
  const iv = generateKeyFromString(secretIv, 16);

  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    iv
  );

  let decrypted = decipher.update(value, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
