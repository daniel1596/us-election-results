let db = require("../../database/core.js")
let { getVoteShareNationwide, getVoteShareStatewide } = require("../../database/sql_scripts")

let nationwide_vote_shares = {}
let statewide_vote_shares = {}

db.serialize(function () {
  // Currently using db.all because I think that's more effective than looping through results one at a time.
  // This would probably be inefficient if we had millions of results, however.

  // Get nationwide results first
  db.each(getVoteShareNationwide, function (err, row) {
    let year = row.Year
    delete row.Year
    nationwide_vote_shares[`${year}`] = row
  })

  db.all(getVoteShareStatewide, function (err, rows) {
    let stateNames = [... new Set(rows.map(row => row.StateName))]
    stateNames.forEach(stateName => {
      let rowsForState = rows.filter(row => row.StateName === stateName)
      rowsForState.forEach(row => {
        delete row.StateName // Since the data is now grouped by state name, we don't need this property

        let voteShareForYear = nationwide_vote_shares[row.Year]
        row["OffsetFromNationalAvgD"] = row["PctD"] - voteShareForYear.PctD
        row["OffsetFromNationalAvgR"] = row["PctR"] - voteShareForYear.PctR
        row["OffsetFromNationalAvg3rd"] = row["PctThirdParty"] - voteShareForYear.PctThirdParty
      })

      statewide_vote_shares[stateName] = rowsForState
    })
  })
})

module.exports = {
  nationwide_vote_shares,
  statewide_vote_shares
}
