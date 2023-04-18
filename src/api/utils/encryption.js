import crypto from "crypto"

const encryption = (texte, cle) => {
  const cipher = crypto.createCipher("aes-256-cbc", cle)
  let crypted = cipher.update(texte, "utf8", "hex")
  crypted += cipher.final("hex")

  return crypted
}

export default encryption
