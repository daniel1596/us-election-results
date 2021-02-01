// sqlite portion - can export somewhere else at some point
const sqlite3 = require('sqlite3').verbose()

// This file path seems to relative to the app.js path, which I suppose is using this file
// via the app.use(api) command
db = new sqlite3.Database("../data/presidential-election-voting-patterns.sqlite")

module.exports = db



// Extra code - leaving here now for reference. May not want to keep here forever.

// db.run('CREATE TABLE lorem (info TEXT)')
// var stmt = db.prepare('INSERT INTO lorem VALUES (?)')
// for (var i = 0; i < 10; i++) {
// 	stmt.run('Ipsum ' + i)
// }
// stmt.finalize()