import UserModel from "@/api/db/models/UserModel"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"

const user = mw({
  GET: [
    auth,
    async (req, res) => {
      const { role, classes } = req.user

      if (role === "admin") {
        const getUsers = await UserModel.find()
        res.send({ result: getUsers })

        return
      } else if (role === "staff") {
        const getUsers = await UserModel.find({
          $or: [{ role: "student" }, { role: "teacher" }],
        })
        res.send({ result: getUsers })

        return
      } else if (role === "teacher") {
        const getUsers = await UserModel.find({
          role: "student",
          classes: { $in: classes },
        })
        res.send({ result: getUsers })

        return
      } else {
        res.status(401).send({ error: "Forbidden." })

        return
      }
    },
  ],
})

export default user
