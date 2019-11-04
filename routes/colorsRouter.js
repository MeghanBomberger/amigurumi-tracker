const express = require('express')
const db = require('../db/colorsDB.js')

const router = express.Router()

router.get('/', async (req, res, next) => {
	try {
		let results = await db.all()
		const mapColors = results.map(color => {
			return {
				id: color.id,
				colorName: color.colorName,
				colorSwatch: color.colorSwatch,
				brandName: color.brandName,
				yarntype: {
					yarnTypeId: color.yarnTypeId,
					yarnTypeName: color.yarnType
				},
				yarnweight: {
					yarnWeightId: color.yarnWeightId,
					weightNumber: color.weightNumber,
					weightName: color.weightName
				}
			}
		})
		res.json(mapColors)
	} catch (e) {
		console.log(e)
		res.sendStatus(500)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		let result = await db.one(req.params.id)
		const colorData = {
			id: result.id,
			colorName: result.colorName,
			colorSwatch: result.colorSwatch,
			brandName: result.brandName,
			yarntype: {
				yarnTypeId: result.yarnTypeId,
				yarnTypeName: result.yarnType
			},
			yarnweight: {
				yarnWeightId: result.yarnWeightId,
				weightNumber: result.weightNumber,
				weightName: result.weightName
			}
		}
		res.json(colorData)
	} catch (e) {
		console.log(e)
		res.sendStatus(500)
	}
})

router.post("/", async (req, res, next) => {
	try {
		let results = await db.create(
			req.body.colorName,
			req.body.colorSwatch,
			req.body.brandName,
			req.body.yarnTypeId,
			req.body.yarnWeightId
		)
		res.json(results)
	} catch (e) {
		console.log(e)
		res.sendStatus(500)
	}
})

router.patch("/:id", async (req, res, next) => {
	try {
		let results = await db.update(
			req.body.colorName,
			req.body.colorSwatch,
			req.body.brandName,
			req.body.yarnTypeId,
			req.body.yarnWeightId,
			req.params.id
		)
		res.json(`Updated color #${req.params.id}`)
	} catch (e) {
		console.log(e)
		res.sendStatus(500)
	}
})

router.delete("/:id", async (req, res, next) => {
	try {
		let results = await db.delete(req.params.id)
		res.json(`Deleted color #${req.params.id}`)
	} catch (e) {
		console.log(e)
		res.sendStatus(500)
	}
})

module.exports = router