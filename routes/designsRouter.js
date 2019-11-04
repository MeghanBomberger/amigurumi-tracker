const express = require('express')
const db = require('../db/designsDB.js')

const router = express.Router()

router.get('/', async (req, res, next) => {
	try {
		let results = await db.all()
		// console.log(results)
		const arrayedResults = []
		const mapResults = await results.map(result => {
			const convertedResults = {
				id: result.id,
				designName: result.designName,
				designNotes: result.designNotes,
				quantity: result.quantity,
				colorsUsed: JSON.parse(result.colorsUsed),
				fandoms: JSON.parse(result.fandoms),
				crochetHooks: JSON.parse(result.crochetHooks)
			}
			arrayedResults.push(convertedResults)
		})
		console.log(arrayedResults)
		res.json(arrayedResults)
	} catch (e) {
		console.log(e)
		res.sendStatus(500)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		let results = await db.one(req.params.id)
		console.log(results)
		const convertedResults = {
			id: results.id,
			designName: results.designName,
			designNotes: results.designNotes,
			quantity: results.quantity,
			colorsUsed: JSON.parse(results.colorsUsed),
			fandoms: JSON.parse(results.fandoms),
			crochetHooks: JSON.parse(results.crochetHooks)
		}
		res.json(convertedResults)
	} catch (e) {
		console.log(e)
		res.sendStatus(500)
	}
})

//FIXME 
router.post("/", async (req, res, next) => {
	try {
		let results = await db.create(
			req.body.designName,
			req.body.designNotes,
			req.body.quantity
		)
	} catch (e) {
		console.log(e)
		res.sendStatus(500)
	}
})

// create one
// update one
// delete one

module.exports = router