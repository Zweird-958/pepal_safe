import { Schema } from "mongoose"

const EmbeddedUserTypeSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
  },
  { _id: false }
)

export default EmbeddedUserTypeSchema
