import { createHash } from "crypto"

export const generateUniqueId = () => {
  const currentTimestamp = Date.now().toString()
  const randomValue = Math.random().toString()

  const hash = createHash("sha256")
    .update(currentTimestamp + randomValue)
    .digest("hex")

  return hash
}
