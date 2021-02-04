const cors = require("cors")
const express = require("express")

let db = require("../../database/core.js")
const { statewideAnalysis } = require('./analysis')
const { nationwide_vote_shares, statewide_vote_shares } = require('./votes')

let api = express.Router()

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

module.exports = api
