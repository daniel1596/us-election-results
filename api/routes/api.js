const express = require("express")
let api = express.Router()

let db = require("../database/core.js")
let sql_scripts = require("../database/sql_scripts")

let nationwide_vote_shares = {}
let statewide_vote_shares = {}

db.serialize(function () {
  // Currently using db.all because I think that's more effective than looping through results one at a time.
  // This would probably be inefficient if we had millions of results, however.

  // Get nationwide results first
  db.all(sql_scripts.getNationwideVoteShare, function (err, rows) {
    nationwide_vote_shares = rows // can reorganize the JSON later if needed; for now it's fine
  })

  db.all(sql_scripts.getStatewideVoteShare, function (err, rows) {
    let stateNames = [... new Set(rows.map(row => row.StateName))]
    stateNames.forEach(stateName => {
      let rowsForState = rows.filter(row => row.StateName === stateName)
      rowsForState.forEach(row => {
        delete row.StateName // Since the data is now grouped by state name, we don't need this property

        let voteShareForYear = nationwide_vote_shares.find(share => share.Year === row.Year)
        row["OffsetFromNationalAvgD"] = row["PctD"] - voteShareForYear.PctD
        row["OffsetFromNationalAvgR"] = row["PctR"] - voteShareForYear.PctR
      })

      statewide_vote_shares[stateName] = rowsForState
    })
  })
})

db.close()


api.get('/', function (req, res) {
  res.json({
    nationwide_vote_shares,
    statewide_vote_shares
  })
})

module.exports = api
