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

designsdb.all = (id) => {
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



//TODO create one
//TODO update one
//TODO delete one

module.exports = designsdb