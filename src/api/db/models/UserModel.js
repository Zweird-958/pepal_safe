import UserSchema from "@/api/db/schemas/UserSchema"
import mongoose from "mongoose"

const UserModel = mongoose.modelNames().includes("User")
  ? mongoose.model("User")
  : mongoose.model("User", UserSchema)

export default UserModel
