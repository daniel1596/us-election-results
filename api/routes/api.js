const express = require("express")
let api = express.Router()

let db = require("../database/core.js")
let sql_scripts = require("../database/sql_scripts")

let vote_shares = {}

let stateNames = []

db.serialize(function () {
  // Currently using db.all because I think that's more effective than looping through results one at a time.
  // This would probably be inefficient if we had millions of results, however.
  db.all(sql_scripts.getVotesSql, function (err, rows) {
    stateNames = [... new Set(rows.map(row => row.StateName))]
    stateNames.forEach(stateName => {
      let rowsForState = rows.filter(row => row.StateName === stateName)
      rowsForState.forEach(row => {
        delete row.StateName // Since the data is now grouped by state name, we don't need this property
      })

      vote_shares[stateName] = rowsForState
    })
  })
})

db.close()


api.get('/', function (req, res) {
  res.json({
    vote_shares
  })
})

module.exports = api
