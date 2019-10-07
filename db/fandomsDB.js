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

let fandomsdb = {}

fandomsdb.all = () => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM fandoms`, (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results)
		})
	})
}

fandomsdb.one = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM fandoms WHERE id = ?`, [id], (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results[0])
		})
	})
}

fandomsdb.create = (fandom) => {
	return new Promise((resolve, reject) => {
		pool.query(
			'INSERT INTO fandoms (fandom) VALUES (?)',
			[fandom],
			(err, results) => {
				if (err) {
					return reject(err)
				}
				return resolve(results)
			}
		)
	})
}

fandomsdb.update = (fandom, id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			'UPDATE fandoms SET fandom = ? WHERE id = ?',
			[fandom, id],
			(err, results) => {
				if (err) {
					return reject(err)
				}
				return resolve(results)
			}
		)
	})
}

fandomsdb.delete = (id) => {
	return new Promise((resolve, reject) => {
		pool.query('DELETE FROM fandoms WHERE id = ?', [id], (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results)
		})
	})
}

module.exports = fandomsdb