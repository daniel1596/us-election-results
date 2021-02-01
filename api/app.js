const express = require('express')
const app = express()
const port = 3000

let api = require("./routes/api")
const apiUrl = "/api/v0"

app.use(apiUrl, api)

app.get('/', (req, res) => {
  res.send(`Click <a href="${apiUrl}" target="_self">here</a> for the API.`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})