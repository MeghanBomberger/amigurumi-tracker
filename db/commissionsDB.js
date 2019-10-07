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

let commissionsdb = {}

commissionsdb.all = () => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM commissions`, (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results)
		})
	})
}

commissionsdb.one = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM commissions WHERE id = ?`, [id], (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results[0])
		})
	})
}

module.exports = commissionsdb