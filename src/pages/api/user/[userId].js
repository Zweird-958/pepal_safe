import auth from "@/api/middlewares/auth.js"
import encryption from "@/api/utils/encryption.js"
import UserModel from "@/api/db/models/UserModel.js"
import mw from "@/api/mw"
import config from "@/api/config.js"

const user = mw({
  GET: [
    auth,
    async (req, res) => {
      const userId = req.query.userId
      const { role } = req.user
      const user = await UserModel.findOne({ _id: userId })

      if (role === "admin") {
        res.send({ result: user })

        return
      }

      if (
        config.roles.ROLES_PRIORITY[role] >
        config.roles.ROLES_PRIORITY[user.role]
      ) {
        res.send({ result: user })

        return
      } else {
        res
          .status(403)
          .send({ error: "You don't have the right to access this page" })

        return
      }

      // if (role === "admin") {
      //   res.send({ result: user })
      // } else if (
      //   role === "staff" &&
      //   user.role !== "admin" &&
      //   user.role !== "staff"
      // ) {
      //   res.send({ result: user })
      // } else if (role === "teacher" && user.role === "student") {
      //   res.send({ result: user })
      // } else {
      //   res.send({ error: "You don't have the right to access this page" })
      // }
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
