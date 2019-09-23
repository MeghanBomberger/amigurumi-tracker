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

let imagesdb = {}

imagesdb.all = () => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM images`, (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results)
		})
	})
}

imagesdb.one = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM images WHERE id = ?`, [id], (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results[0])
		})
	})
}

module.exports = imagesdb