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

let colorsdb = {}

colorsdb.all = () => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM colors`, (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results)
		})
	})
}

colorsdb.one = (id) => {
	return new Promise((resolve, reject) => {
		pool.query('SELECT * FROM colors WHERE id = ?', [id], (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results[0])
		})
	})
}

colorsdb.create = (colorName, colorSwatch, brandName) => {
	return new Promise((resolve, reject) => {
		pool.query(
			'INSERT INTO colors (colorName, colorSwatch, brandName) VALUES (?, ?, ?)',
			[colorName, colorSwatch, brandName],
			(err, results) => {
				if (err) {
					return reject(err)
				}
				return resolve(results[0])
			}
		)
	})
}

colorsdb.update = (colorName, colorSwatch, brandName, id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			'UPDATE colors SET colorName = ?, colorSwatch = ?, brandName = ? WHERE id = ?',
			[colorName, colorSwatch, brandName, id],
			(err, results) => {
				if (err) {
					return reject(err)
				}
				return resolve(results[0])
			}
		)
	})
}

colorsdb.delete = (id) => {
	return new Promise((resolve, reject) => {
		pool.query('DELETE FROM colors WHERE id = ?', [id], (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results[0])
		})
	})
}

module.exports = colorsdb