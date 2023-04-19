import PasswordModel from "@/api/db/models/PasswordModel"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
import decryption from "@/api/utils/decryption"
import encryption from "@/api/utils/encryption"

const password = mw({
  GET: [
    auth,
    async (req, res) => {
      const { passwordId } = req.query
      const { _id } = req.user

      const getPasswords = await PasswordModel.findOne({
        _id: passwordId,
        "user.id": _id,
      })

      const {
        _id: id,
        username,
        user,
        site,
        createdAt,
        updatedAt,
      } = getPasswords

      const newPasswordObject = {
        id,
        username,
        user,
        site,
        createdAt,
        updatedAt,
        password: decryption(getPasswords.password),
      }

      res.send({ result: newPasswordObject })
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
        "createdBy._id": user._id,
      })

      const updatePassword = await PasswordModel.findOneAndUpdate(
        { _id: passwordId },
        {
          username: username === "" ? oldPassword.username : username,
          password:
            password === "" ? oldPassword.password : encryption(password),
          site: site === "" ? oldPassword.site : site,
        }
      )
      res.send(updatePassword)
    },
  ],

  // DELETE: [
  //   auth,
  //   async (req, res) => {
  //     const { passwordId } = req.query
  //     const user = req.user

  //     const deletedPassword = await PasswordModel.findOneAndDelete({
  //       _id: passwordId,
  //       "createdBy.userId": user._id,
  //     })

  //     if (!deletedPassword) {
  //       res.status(404).send({ error: "not found" })

  //       return
  //     }

  //     res.send(deletedPassword)
  //   },
  // ],
})

export default password
