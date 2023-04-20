import UserModel from "@/api/db/models/UserModel"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
import hashPassword from "@/api/utils/hashPassword"

const user = mw({
  GET: [
    auth,
    async (req, res) => {
      const { email, _id, classes } = req.user
      const authUser = await UserModel.findOne({ email, _id })

      if (authUser.role === "admin") {
        const getUsers = await UserModel.find()
        res.send({ result: getUsers })
      } else if (authUser.role === "staff") {
        const getUsers = await UserModel.find({
          $or: [{ role: "student" }, { role: "teacher" }],
        })
        res.send({ result: getUsers })
      } else if (authUser.role === "teacher") {
        const getUsers = await UserModel.find({
          role: "student",
          classes: { $in: classes },
        })
        res.send({ result: getUsers })
      } else {
        res.send({ error: "You don't have the right to access this page" })
      }
    },
  ],
  POST: [
    auth,
    async (req, res) => {
      const authUser = req.user

      if (authUser.role == "admin" || authUser.role == "staff") {
        const { email, password, username, role } = req.body
        const passwordHash = hashPassword(password)
        const user = await UserModel.create({
          email,
          passwordHash,
          username,
          role,
        })
        res.send({ result: user })
      } else {
        res.send({ error: "You don't have the right to access this page" })
      }
    },
  ],
})

export default user
