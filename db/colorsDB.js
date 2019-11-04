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
		pool.query(`
			SELECT 
				colors.id,
				colors.colorName,
				colors.colorSwatch,
				colors.brandName,
				colors.yarnTypeId,
				colors.yarnWeightId,
				yarntypes.yarnType,
				yarnweights.weightNumber,
				yarnweights.weightName
			FROM colors
				JOIN yarntypes 
						ON yarntypes.id = colors.yarnTypeId
				JOIN yarnweights
						ON yarnweights.id = colors.yarnWeightId
		`, (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results)
		})
	})
}

colorsdb.one = (colorId) => {
	return new Promise((resolve, reject) => {
		pool.query(`
			SELECT 
				colors.id,
				colors.colorName,
				colors.colorSwatch,
				colors.brandName,
				colors.yarnTypeId,
				colors.yarnWeightId,
				yarntypes.yarnType,
				yarnweights.weightNumber,
				yarnweights.weightName
			FROM colors
				JOIN yarntypes 
					ON yarntypes.id = colors.yarnTypeId
				JOIN yarnweights
					ON yarnweights.id = colors.yarnWeightId
			WHERE colors.id = ?
		`, [colorId], (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results[0])
		})
	})
}

colorsdb.create = (
	colorName,
	colorSwatch,
	brandName,
	yarnTypeId,
	yarnWeightId
) => {
	return new Promise((resolve, reject) => {
		pool.query (`
			INSERT INTO colors (
				colorName,
				colorSwatch,
				brandName,
				yarnTypeId,
				yarnWeightId
			)
			VALUES (?, ?, ?, ?, ?)
		`,[
			colorName,
			colorSwatch,
			brandName,
			yarnTypeId,
			yarnWeightId
		], (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results)
		})
	})
}

colorsdb.update = (
	colorName,
	colorSwatch,
	brandName,
	yarnTypeId,
	yarnWeightId,
	colorId
) => {
	return new Promise((resolve, reject) => {
		pool.query(`
			UPDATE colors
			SET
				colorName = ?,
				colorSwatch = ?,
				brandName = ?,
				yarnTypeId = ?,
				yarnWeightId = ?
			WHERE id = ?
		`,[
			colorName,
			colorSwatch,
			brandName,
			yarnTypeId,
			yarnWeightId,
			colorId
		], (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results)
		})
	})
}

colorsdb.delete = (leadId) => {
	return new Promise((resolve, reject) => {
		pool.query(`
			DELETE FROM colors
			WHERE id = ?
		`, [leadId], (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results)
		})
	})
}

module.exports = colorsdb