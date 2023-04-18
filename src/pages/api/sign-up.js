import UserModel from "@/api/db/models/UserModel"
import mw from "@/api/mw"
import hashPassword from "@/api/utils/hashPassword"
import UserTypeModel from "@/api/db/models/UserTypeModel"

const signUp = mw({
  POST: [
    async (req, res) => {
      const { username, email, password, type = "student" } = req.body

      try {
        const passwordHash = hashPassword(password)

        const userToAddType = await UserTypeModel.findOne({ name: type })

        if (!userToAddType) {
          res.send({ error: "User type not found" })

          return
        }

        const userToAddType = await UserTypeModel.findOne({ _id: user.type.id })

        

        if (!userToAddType) {
          res.send({ error: "User type not found" })

          return
        }

        const user = await UserModel.create({
          email,
          passwordHash,
          username,
          type: { id: userType._id },
        })

        res.send({ result: user })
      } catch (err) {
        res.send({ error: err })
      }
    },
  ],
})

export default signUp
