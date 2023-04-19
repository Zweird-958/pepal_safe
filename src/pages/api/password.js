import PasswordModel from "@/api/db/models/PasswordModel"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
import encryption from "@/api/utils/encryption"
import config from "@/api/config"
import UserModel from "@/api/db/models/UserModel"

const password = mw({
  POST: [
    auth,
    async (req, res) => {
      const { username, password, site, userEmail } = req.body
      const { email, _id, role } = req.user

      if (role === "admin" && userEmail) {
        const user = await UserModel.findOne({ email: userEmail })

        const createPassword = await PasswordModel.create({
          username,
          password: encryption(password, config.security.encryption.cle),
          site,
          createdBy: { email: user.email, id: user._id },
        })
        res.send(createPassword)

        return
      } else {
        const createPassword = await PasswordModel.create({
          username,
          password: encryption(password, config.security.encryption.cle),
          site,
          createdBy: { email, id: _id },
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
      const getPasswords = await PasswordModel.find({
        "createdBy.email": email,
        "createdBy._id": _id,
      })
      res.send(getPasswords)
    },
  ],
})

export default password
