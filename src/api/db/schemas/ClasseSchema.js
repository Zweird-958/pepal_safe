import { Schema } from "mongoose"

const classes = new Schema({
  name: { type: String, required: true },
})

export default classes
