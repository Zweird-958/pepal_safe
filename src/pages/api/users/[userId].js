import mw from "@/api/mw"
import UserModel from "@/api/db/models/UserModel"

const user = mw({
  GET: [
    async (req, res) => {
      const { userId } = req.query

      const user = await UserModel.findOne({ _id: userId })

      if (!user) {
        res.status(404).send({ error: "User not found." })

        return
      }

      res.send({ result: user.role })
    },
  ],
})

export default user
