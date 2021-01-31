const express = require("express")
let api = express.Router()


// sqlite portion - can export somewhere else at some point
const sqlite3 = require('sqlite3').verbose()

// This file path seems to relative to the app.js path, which I suppose is using this file
// via the app.use(api) command
db = new sqlite3.Database("../data/presidential-election-voting-patterns.sqlite")

let entities = [];
const getEntitiesSql = "SELECT" +
  "  s.Abbreviation || (CASE WHEN ee.DistrictNumber THEN ('-' || CAST(ee.DistrictNumber AS TEXT)) ELSE '' END) " +
  "   AS ElectoralAbbreviation" +
  " FROM ElectoralEntity AS ee" +
  "  INNER JOIN State AS s ON ee.StateID = s.ID" +
  " ORDER BY ElectoralAbbreviation ASC"

db.serialize(function () {
  db.each(getEntitiesSql, function (err, row) {
    entities.push(row.ElectoralAbbreviation)
  })
})

// db.serialize(function () {})

// db.run('CREATE TABLE lorem (info TEXT)')
// var stmt = db.prepare('INSERT INTO lorem VALUES (?)')
// for (var i = 0; i < 10; i++) {
// 	stmt.run('Ipsum ' + i)
// }
// stmt.finalize()

db.close()


api.get('/', function (req, res) {
  res.json({ entities })
})

module.exports = api