import mongoose from "mongoose"
import UserSchema from "@/api/db/schemas/UserSchema"

const UserModel = mongoose.modelNames().includes("User")
  ? mongoose.model("User")
  : mongoose.model("User", UserSchema)

export default UserModel
