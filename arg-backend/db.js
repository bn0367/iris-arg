const path = require('path')
const {Level} = require("level");


const db = new Level(path.join(__dirname + 'arg-db'))

module.exports = db;