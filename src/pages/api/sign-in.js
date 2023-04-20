import config from "@/api/config"
import UserModel from "@/api/db/models/UserModel"
import mw from "@/api/mw"
import hashPassword from "@/api/utils/hashPassword"
import jsonwebtoken from "jsonwebtoken"

const signIn = mw({
  POST: [
    async (req, res) => {
      const { email, password } = req.body

      const passwordHash = hashPassword(password)

      const user = await UserModel.findOne({ email })

      if (!user || user.passwordHash !== passwordHash) {
        res.status(401).send({ error: "Invalid credentials" })

        return
      }

      const sessionToken = jsonwebtoken
        .sign(
          {
            payload: {
              userId: user._id,
              userUsername: user.username,
              userRole: user.role,
            },
          },
          config.security.jwt.secret,
          { expiresIn: config.security.jwt.expiresIn }
        )
        .toString("hex")

      res.send({ result: sessionToken })
    },
  ],
})

export default signIn
