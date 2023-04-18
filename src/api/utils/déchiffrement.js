import crypto from "crypto"

const déchiffrement = (texte, cle) => {
  const decipher = crypto.createDecipher("aes-256-cbc", cle)
  let dec = decipher.update(texte, "hex", "utf8")
  dec += decipher.final("utf8")

  return dec
}

export default déchiffrement
