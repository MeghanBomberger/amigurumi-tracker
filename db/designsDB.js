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

let designsdb = {}

designsdb.all = () => {
	return new Promise((resolve, reject) => {
		pool.query(`
			SELECT
				d.id,
				d.designName,
				d.designNotes,
				d.quantity,
				JSON_ARRAYAGG(
					JSON_OBJECT(
							"colorName", c.colorName,
							"colorSwatch", c.colorSwatch,
							"brandName", c.brandName,
							"yarnType", yt.yarntype,
							"yarnWeight", JSON_OBJECT(
								"weightNumber", yw.weightNumber,
								"weightName", yw.weightName
							)
					)
				) AS colorsUsed,
				JSON_ARRAY(
					f.fandom
				) AS fandoms,
				JSON_ARRAYAGG(
					JSON_OBJECT(
						"hooksize", ch.size,
						"comparativeKnittingNeedleSize", ch.knittingNeedleNumber,
						"usSize", ch.usSize,
						"ukSize", ch.ukSize
					)
				) AS crochetHooks
			FROM
				designs AS d
				INNER JOIN design_colors AS dc 
					ON dc.designId = d.id 
				INNER JOIN colors AS c 
					ON dc.colorId = c.id
				INNER JOIN yarnweights AS yw 
					ON c.yarnWeightId = yw.id
				INNER JOIN yarntypes AS yt 
					ON c.yarnTypeId = yt.id
				INNER JOIN design_fandoms AS df 
					ON df.designId = d.id
				INNER JOIN fandoms AS f 
					ON df.fandomId = f.id
				INNER JOIN design_crochetHooks As dch 
					ON dch.designId = d.id
				INNER JOIN crochetHooks AS ch 
					ON dch.crochetHookId = ch.id
			GROUP BY d.id
			;
		`, (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results)
		})
	})
}

designsdb.one = (id) => { 
	return new Promise((resolve, reject) => {
		pool.query(`
			SELECT
				d.id,
				d.designName,
				d.designNotes,
				d.quantity,
				JSON_ARRAYAGG(
					JSON_OBJECT(
							"colorName", c.colorName,
							"colorSwatch", c.colorSwatch,
							"brandName", c.brandName,
							"yarnType", yt.yarntype,
							"yarnWeight", JSON_OBJECT(
								"weightNumber", yw.weightNumber,
								"weightName", yw.weightName
							)
					)
				) AS colorsUsed,
				JSON_ARRAY(
					f.fandom
				) AS fandoms,
				JSON_ARRAYAGG(
					JSON_OBJECT(
						"hooksize", ch.size,
						"comparativeKnittingNeedleSize", ch.knittingNeedleNumber,
						"usSize", ch.usSize,
						"ukSize", ch.ukSize
					)
				) AS crochetHooks
			FROM
				designs AS d
				INNER JOIN design_colors AS dc 
					ON dc.designId = d.id 
				INNER JOIN colors AS c 
					ON dc.colorId = c.id
				INNER JOIN yarnweights AS yw 
					ON c.yarnWeightId = yw.id
				INNER JOIN yarntypes AS yt 
					ON c.yarnTypeId = yt.id
				INNER JOIN design_fandoms AS df 
					ON df.designId = d.id
				INNER JOIN fandoms AS f 
					ON df.fandomId = f.id
				INNER JOIN design_crochetHooks As dch 
					ON dch.designId = d.id
				INNER JOIN crochetHooks AS ch 
					ON dch.crochetHookId = ch.id
			WHERE d.id = ?
			;			
		`, [id], (err, results) => {
			if (err) {
				return reject(err)
			}
			return resolve(results[0])
		})
	})
}

//FIXME
designsdb.create = (designName, designNotes, quantity) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`INSERT INTO designs (designName, designNotes, quantity) VALUES (?, ?, ?)`,
			[designName, designNotes, quantity],
			(err, results) => {
				if (err) {
					return reject(err)
				}
				console.log(results)
				return resolve(results)
			}
		)		
	}).then(async (results, colors, crochetHooks, fandoms) => {
		const designId = results.insertId
		const valuesArray = []
		const mapColorIds = await colors.map(color => {
			valuesArray.push(designId, color)
			return color
		})
		const mapHookIds = await crochetHooks.map(hook => {
			valuesArray.push(designId, hook)
			return hook
		})
		const mapFandom = await fandoms.map(fandom => {
			valuesArray.push(designId, fandom)
			return fandom
		})
		await console.log(valuesArray)
	})
}

//TODO update one
//TODO delete one

module.exports = designsdb