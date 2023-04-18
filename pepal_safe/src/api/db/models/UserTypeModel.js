import UserTypeSchema from "@/api/db/schemas/UserTypeSchema"
import mongoose from "mongoose"

const UserTypeModel = mongoose.modelNames().includes("Type")
  ? mongoose.model("Type")
  : mongoose.model("Type", UserTypeSchema)

export default UserTypeModel
