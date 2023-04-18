import config from "@/api/config.js"
import log from "@/api/middlewares/log"
import mongoose from "mongoose"

const mw = (handlersByMethod) => async (req, res) => {
  const { method } = req
  const handlers = handlersByMethod[method]

  // Handlers not found
  if (!handlers) {
    res.status(404).send({ error: "not found" })

    return
  }

  await mongoose.connect(config.db.uri)

  try {
    let handlerIndex = 0

    // Execute each handler
    const next = async () => {
      const handler = handlers[handlerIndex]
      handlerIndex += 1

      await handler(req, res, next)
    }
    // await next()
    await log(req, res, next)
  } finally {
    await mongoose.disconnect()
  }
}

export default mw
