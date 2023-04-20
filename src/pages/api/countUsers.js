import UserModel from "@/api/db/models/UserModel"
import mw from "@/api/mw"

const CountUsers = mw({
  GET: [
    async (req, res) => {
      const count = await UserModel.find().count()
      res.send({ result: count > 0 })
    },
  ],
})

export default CountUsers
