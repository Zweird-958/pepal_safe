import config from "@/api/config"
import CryptoJS from "crypto-js"

const encryption = (password) => {
  const cipherPassword = CryptoJS.AES.encrypt(
    password,
    config.security.encryption.key
  ).toString()

  return cipherPassword
}

export default encryption
