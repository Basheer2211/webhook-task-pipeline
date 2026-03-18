import crypto from "crypto"

export function verifyWebhookSignature(payload: string, signature: string) {

  const secret = process.env.WEBHOOK_SECRET!

  const hash = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex")

  return hash === signature
}