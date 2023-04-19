import { UserModel } from "../../../models/User"
import mw from "../../../middlewares/mw"
import auth from "../../../middlewares/auth"
import encryption from "../../../utils/encryption"

const user = mw({
  GET: [
    auth,
    async (req, res) => {
      const userId = req.query.userId
      const { role } = req.user
      const user = UserModel.findOne({ _id: userId })

      if (role === "admin") {
        res.send({ result: user })
      } else if (
        role === "staff" &&
        user.role !== "admin" &&
        user.role !== "staff"
      ) {
        res.send({ result: user })
      } else if (role === "teacher" && user.role === "student") {
        res.send({ result: user })
      } else {
        res.send({ error: "You don't have the right to access this page" })
      }
    },
  ],

  PATCH: [
    auth,
    async (req, res) => {
      const authUser = req.user
      const { email, password, username, role } = req.body

      if (authUser.role === "admin" || authUser.role === "staff") {
        const passwordHash = encryption(password)
        const user = await UserModel.create({
          email,
          passwordHash,
          username,
          role,
        })
        res.send({ result: user })
      }
    },
  ],

  DELETE: [
    auth,
    async (req, res) => {
      const authUser = req.user
      const userId = req.query.userId

      if (authUser.role === "admin" || authUser.role === "staff") {
        const user = await UserModel.deleteOne({ _id: userId })
        res.send({ result: user })
      }
    },
  ],
})

export default user
