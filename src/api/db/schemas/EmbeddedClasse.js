import { Schema } from "mongoose"

const EmbeddedClasseSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
)

export default EmbeddedClasseSchema
