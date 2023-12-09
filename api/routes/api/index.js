import cors from "cors"
import { Router } from "express"

import db from "../../database/core.js"
import { statewideAnalysis } from './analysis.js'
import { nationwide_vote_shares, statewide_vote_shares } from './votes.js'

let api = Router()

api.get('/analysis', cors(), function (req, res, next) {
  res.json({
    statewideAnalysis
  })
})

api.get('/votes', cors(), function (req, res, next) {  
  res.json({
    nationwide_vote_shares,
    statewide_vote_shares
  })
})

db.close()

export default api
