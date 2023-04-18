import { Schema } from "mongoose"

const EmbeddedUserSchema = new Schema(
  {
    id: { type: String, required: true },
    email: { type: String, required: true },
  },
  { _id: false }
)

export default EmbeddedUserSchema
