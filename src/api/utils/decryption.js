import config from "@/api/config"
import CryptoJS from "crypto-js"

const decryption = (chipherPassword) => {
  const bytes = CryptoJS.AES.decrypt(
    chipherPassword,
    config.security.encryption.key
  )
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

  return originalPassword
}

export default decryption
