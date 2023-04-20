import UserModel from "@/api/db/models/UserModel"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"

const admin = mw({
  PATCH: [
    auth,
    async (req, res) => {
      const { role } = req.user
      const { email, role: newRole } = req.body

      if (role !== "admin") {
        res.status(401).send({ error: "Unauthorized." })

        return
      }

      try {
        const user = await UserModel.findOneAndUpdate(
          { email },
          { role: newRole }
        )

        res.send({ result: user })

        return
      } catch (error) {
        res.status(403).send({ error: "Something went wrong." })

        return
      }
    },
  ],
})

export default admin
