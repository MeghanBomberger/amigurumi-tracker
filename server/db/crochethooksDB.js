const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const pool = mysql.createPool({
	connectionLimit: 10,
	password: process.env.API_PASSWORD,
	user: process.env.API_USER,
	database: process.env.API_DATABASE,
	host: process.env.HOST,
	port: process.env.API_PORT
});

let crochethooksdb = {}

crochethooksdb.all = () => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM crochethooks`, (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results)
		})
	})
}

crochethooksdb.one = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM crochethooks WHERE id = ?`, [id], (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results[0])
		})
	})
}

module.exports = crochethooksdb