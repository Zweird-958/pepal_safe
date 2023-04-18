import PasswordModel from "@/api/db/models/PasswordModel"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"

const password = mw({
  POST: [
    auth,
    async (req, res) => {
      const { username, password, site } = req.body
      const { email, _id } = req.user

      const createPassword = await PasswordModel.create({
        username,
        password,
        site,
        createdBy: { email, _id },
      })
      res.send(createPassword)
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
