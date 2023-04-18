import UserModel from "@/api/db/models/UserModel"
import mw from "@/api/mw"
import hashPassword from "@/api/utils/hashPassword"

const signUp = mw({
  POST: [
    async (req, res) => {
      const { username, email, password } = req.body

      try {
        const passwordHash = hashPassword(password)

        const user = await UserModel.create({
          email,
          passwordHash,
          username,
        })

        res.send({ result: user })
      } catch (err) {
        res.send({ error: err })
      }
    },
  ],
})

export default signUp
