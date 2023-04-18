import { Schema } from "mongoose"
import EmbeddedUserTypeSchema from "./EmbeddedUserTypeSchema"

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    type: {
      type: EmbeddedUserTypeSchema,
      required: true,
    },
  },
  { timestamps: true }
)

export default UserSchema
