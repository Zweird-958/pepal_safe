import { Schema } from "mongoose"
import EmbeddedClasseSchema from "./EmbeddedClasse"

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
    role: {
      type: String,
      default: "student",
    },
    passwordChanged: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: EmbeddedClasseSchema,
    },
  },
  { timestamps: true }
)

export default UserSchema
