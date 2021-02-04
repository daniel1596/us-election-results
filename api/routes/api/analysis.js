let db = require("../../database/core.js")
let { getAnalysisStatewide } = require("../../database/sql_scripts")

let statewideAnalysis = {}

db.serialize(function () {
  db.each(getAnalysisStatewide, function (err, row) {
    statewideAnalysis[row.Name] = row.Analysis
  })
})

module.exports = {
  statewideAnalysis
}