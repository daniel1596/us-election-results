const express = require("express")
let api = express.Router()

let db = require("../database/db.js")

let votes = {}
const getEntitiesSql = `SELECT
  s.Abbreviation || (CASE WHEN ee.DistrictNumber THEN ('-' || CAST(ee.DistrictNumber AS TEXT)) ELSE '' END)
    AS ElectoralAbbreviation,
  ev.Percentage,
  ev.PoliticalPartyAbbreviation,
  ev.Year
FROM ElectoralEntity AS ee
  INNER JOIN State AS s ON ee.StateID = s.ID
  INNER JOIN ElectoralVote ev ON ev.ElectoralEntityID = ee.ID
ORDER BY ElectoralAbbreviation, Year ASC`

let abbreviationsDistinct = []

db.serialize(function () {
  // Currently using db.all because I think that's more effective than looping through results one at a time.
  // Would be inefficient if we had millions of results, however.
  db.all(getEntitiesSql, function (err, rows) {
    abbreviationsDistinct = [...new Set(rows.map(row => row.ElectoralAbbreviation))]
    abbreviationsDistinct.forEach(abbr => {
      votes[abbr] = rows.filter(row => row.ElectoralAbbreviation === abbr)
    })
  })
})

// TODO issue - this is not accurate. 
// Average vote share can't be determined from averaging the average of the states.
// To determine the popular vote requires counting up the actual votes. Dang.
let averageVoteShare = {}
const getAverageVoteShareSql = `
SELECT PoliticalPartyAbbreviation, Year, ROUND(AVG(Percentage), 2) AS PercentOfVote
FROM ElectoralVote
GROUP BY PoliticalPartyAbbreviation, Year
ORDER BY Year`

db.serialize(function () {
  db.each(getAverageVoteShareSql, function (err, row) {
    const { PoliticalPartyAbbreviation, Year, PercentOfVote } = row
    
    if (!averageVoteShare[Year])
      averageVoteShare[Year] = {}

    averageVoteShare[Year][PoliticalPartyAbbreviation] = PercentOfVote

    // if (averageVoteShare[Year]['D'] && averageVoteShare[Year]['R'])
      //averageVoteShare[Year]["R-D"] = averageVoteShare[Year]['R'] - averageVoteShare[Year]['D']
  })
})

db.close()


api.get('/', function (req, res) {
  res.json({ 
    averageVoteShare,
    by_entity: votes
  })
})

module.exports = api