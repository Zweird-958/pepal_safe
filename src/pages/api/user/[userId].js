import config from "@/api/config"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"
import UserModel from "@/api/db/models/UserModel"

const user = mw({
  GET: [
    auth,
    async (req, res) => {
      const userId = req.query.userId
      const { role, email } = req.user
      const user = await UserModel.findOne({ _id: userId })

      const formatUser = {
        username: user.username,
        email: user.email,
        role: user.role,
        updatedAt: user.updatedAt,
      }

      if (role === "admin") {
        res.send({ result: formatUser })

        return
      }

      if (email === user.email) {
        res.send({ result: formatUser })

        return
      }

      if (config.roles.priority[role] > config.roles.priority[user.role]) {
        res.send({ result: formatUser })

        return
      } else {
        res
          .status(403)
          .send({ error: "You don't have the right to access this page" })

        return
      }
    },
  ],
})

export default user
