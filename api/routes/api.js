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

db.close()


api.get('/', function (req, res) {
  res.json(votes)
})

module.exports = api