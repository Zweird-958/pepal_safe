import config from "@/api/config"
import UserModel from "@/api/db/models/UserModel"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"
import hashPassword from "@/api/utils/hashPassword"

const users = mw({
  GET: [
    auth,
    async (req, res) => {
      const { role } = req.user

      if (role !== "admin") {
        res.status(401).send({ error: "Unauthorized." })

        return
      }

      const users = await UserModel.find()

      res.send({ result: users })
    },
  ],
  POST: [
    auth,
    async (req, res) => {
      const { role } = req.user

      if (config.roles.createUser.includes(role)) {
        const { email, password, username, role } = req.body
        const passwordHash = hashPassword(password)
        const user = await UserModel.create({
          email,
          passwordHash,
          username,
          role,
        })
        res.send({ result: user })

        return
      } else {
        res
          .status(401)
          .send({ error: "You don't have the right to access this page" })

        return
      }
    },
  ],

  PATCH: [
    auth,
    async (req, res) => {
      const { _id, oldEmail, passwordHash, passwordChanged } = req.user
      const { email, oldPassword, password } = req.body

      if (hashPassword(oldPassword) !== passwordHash) {
        res.status(401).send({ error: "Unauthorized." })

        return
      }

      try {
        const user = await UserModel.findOneAndUpdate(
          { _id },
          {
            passwordHash:
              password !== "" ? hashPassword(password) : passwordHash,
            email: email != "" ? email : oldEmail,
            passwordChanged: password !== "" ? true : passwordChanged,
          }
        )

        res.send({ result: user })

        return
      } catch (err) {
        res.status(403).send({ error: err })

        return
      }
    },
  ],
})

export default users
