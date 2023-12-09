import express from 'express'
const app = express()
const port = 3000

import api from "./routes/api/index.js"
const apiRootUrl = "/api/v0"

app.use(apiRootUrl, api)

app.get('/', (req, res) => {
  res.send(`Click <a href="${apiRootUrl}/votes" target="_self">here</a> for the API.`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})