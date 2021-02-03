/**
 * This file serves as a place to store SQL scripts that we will want to import via Node and run via sqlite3 in our API.
 */

const getStatewideVoteShare = `SELECT 
       s.Name AS StateName,
       sevt.Year,
       SUM(sevt.VoteCount) AS VoteCountTotal,
       100.*SUM(CASE WHEN PoliticalPartyAbbreviation == 'D' THEN sevt.VoteCount ELSE 0 END) / SUM(sevt.VoteCount) AS PctD,
       100.*SUM(CASE WHEN PoliticalPartyAbbreviation == 'R' THEN sevt.VoteCount ELSE 0 END) / SUM(sevt.VoteCount) AS PctR,
       100.*SUM(CASE WHEN PoliticalPartyAbbreviation NOT IN ('D', 'R') THEN sevt.VoteCount ELSE 0 END) / SUM(sevt.VoteCount) AS PctThirdParty
	FROM StateElectionVoteTally AS sevt
    INNER JOIN State AS s on sevt.StateID = s.ID
  WHERE sevt.ElectoralVoteTypeID == 'P'
  GROUP BY s.Name, sevt.Year
  ORDER BY s.Name, sevt.Year`


const getNationwideVoteShare = `SELECT 
       sevt.Year,
       SUM(sevt.VoteCount) AS VoteCountTotal,
       100.*SUM(CASE WHEN PoliticalPartyAbbreviation == 'D' THEN sevt.VoteCount ELSE 0 END) / SUM(sevt.VoteCount) AS PctD,
       100.*SUM(CASE WHEN PoliticalPartyAbbreviation == 'R' THEN sevt.VoteCount ELSE 0 END) / SUM(sevt.VoteCount) AS PctR,
       100.*SUM(CASE WHEN PoliticalPartyAbbreviation NOT IN ('D', 'R') THEN sevt.VoteCount ELSE 0 END) / SUM(sevt.VoteCount) AS PctThirdParty
	FROM StateElectionVoteTally AS sevt
  WHERE sevt.ElectoralVoteTypeID == 'P'
  GROUP BY sevt.Year
  ORDER BY sevt.Year`


module.exports = { getNationwideVoteShare, getStatewideVoteShare }
