import EmbeddedUserSchema from "@/api/db/schemas/EmbeddedUserSchema"
import { Schema } from "mongoose"

const PasswordSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdBy: { type: EmbeddedUserSchema, required: true },
    site: { type: String, required: true },
  },
  { timestamps: true }
)

export default PasswordSchema
