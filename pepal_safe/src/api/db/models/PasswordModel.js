import mongoose from "mongoose"
import PasswordSchema from "@/api/db/schemas/PasswordSchema.js"

const PasswordModel = mongoose.modelNames().includes("Password")
  ? mongoose.model("Password")
  : mongoose.model("Password", PasswordSchema)

export default PasswordModel
