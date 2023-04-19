import PasswordModel from "@/api/db/models/PasswordModel"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
import encryption from "@/api/utils/encryption"
import config from "@/api/config"
import UserModel from "@/api/db/models/UserModel"

const ROLES_PRIORITY = {
  student: 0,
  teacher: 1,
  admin: 2,
}

const password = mw({
  POST: [
    auth,
    async (req, res) => {
      const { username, password, site, userEmail } = req.body
      const { email, _id, role } = req.user

      if (userEmail && userEmail !== "") {
        if (role == "student") {
          res.status(403).send({ error: "You are not allowed to do this." })

          return
        } else {
          const user = await UserModel.findOne({ email: userEmail })

          if (!user) {
            res.status(404).send({ error: "User not found." })

            return
          }

          if (ROLES_PRIORITY[role] <= ROLES_PRIORITY[user.role]) {
            res.status(403).send({ error: "You are not allowed to do this." })

            return
          }

          const createPassword = await PasswordModel.create({
            username,
            password: encryption(password, config.security.encryption.cle),
            site,
            user: { email: user.email, id: user._id },
          })
          res.send(createPassword)
        }

        return
      } else {
        const createPassword = await PasswordModel.create({
          username,
          password: encryption(password, config.security.encryption.cle),
          site,
          user: { email, id: _id },
        })
        res.send(createPassword)

        return
      }
    },
  ],
  GET: [
    auth,
    async (req, res) => {
      const { email, _id } = req.user

      try {
        const getPasswords = await PasswordModel.find({
          "user.email": email,
          "user.id": _id,
        }).sort({ site: 1 })
        res.send({ result: getPasswords })
      } catch (err) {
        res.status(500).send({ error: err })

        return
      }
    },
  ],
})

export default password
