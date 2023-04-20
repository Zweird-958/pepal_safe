import config from "@/api/config"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"
import UserModel from "@/api/db/models/UserModel"

const user = mw({
  GET: [
    auth,
    async (req, res) => {
      const userId = req.query.userId
      const { role, _id } = req.user
      const user = UserModel.findOne({ _id: userId })

      if (_id == userId) {
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
