import { Schema } from "mongoose"

const UserTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

export default UserTypeSchema
