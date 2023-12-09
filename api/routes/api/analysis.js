import db from "../../database/core.js"
import { getAnalysisStatewide } from "../../database/sql_scripts.js"

let statewideAnalysis = {}

db.serialize(function () {
  db.each(getAnalysisStatewide, function (err, row) {
    statewideAnalysis[row.Name] = row.Analysis
  })
})

export {
  statewideAnalysis
}