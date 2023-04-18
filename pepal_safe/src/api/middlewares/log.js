const log = async (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`${req.method} ${req.url}`)

  await next()
}

export default log
