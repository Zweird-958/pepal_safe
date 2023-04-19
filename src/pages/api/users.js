import UserModel from "@/api/db/models/UserModel"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"

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
})

export default users
