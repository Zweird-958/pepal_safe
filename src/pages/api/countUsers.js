import UserModel from "@/api/db/models/UserModel"

const CountUsers = async (req, res) => {
  const count = await UserModel.find().count()
  res.send({ result: count > 0 })
}

export default CountUsers
