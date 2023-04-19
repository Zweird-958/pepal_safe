import PasswordModel from "@/api/db/models/PasswordModel"
import mw from "@/api/mw"
import auth from "@/api/mw/auth"

const password = mw({
  GET: [
    auth,
    async (req, res) => {
      const { passwordId } = req.query
      const user = req.user
      const getPasswords = await PasswordModel.find({
        _id: passwordId,
        "user._id": user._id,
      })
      res.send(getPasswords)
    },
  ],

  PATCH: [
    auth,
    async (req, res) => {
      const { username, password, site } = req.body
      const { passwordId } = req.query

      const user = req.user

      const oldPassword = PasswordModel.find({
        _id: passwordId,
        "user._id": user._id,
      })
      const updatePassword = await PasswordModel.findByIdAndUpdate(id, {
        username: username ?? oldPassword.username,
        password: password ?? oldPassword.password,
        site: site ?? oldPassword.site,
      })
      res.send(updatePassword)
    },
  ],

  DELETE: [
    auth,
    async (req, res) => {
      const { passwordId } = req.query
      const user = req.user

      const deletedPassword = await PasswordModel.findOneAndDelete({
        _id: passwordId,
        "user.id": user._id,
      })

      if (!deletedPassword) {
        res.status(404).send({ error: "not found" })

        return
      }

      res.send(deletedPassword)
    },
  ],
})

export default password
