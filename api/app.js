const express = require('express')
const app = express()
const port = 3000

let api = require("./routes/api")

app.use("/api/v0", api)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})