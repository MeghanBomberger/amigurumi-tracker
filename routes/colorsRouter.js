const express = require('express')
const db = require('../db/colorsDB')

const router = express.Router()

router.get('/', async (req, res, next) => {
	try {
		let results = await db.all()
		res.json(results)
	} catch (e) {
		console.log(e)
		res.sendStatus(500)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		let results = await db.one(req.params.id)
		res.json(results)
	} catch (e) {
		console.log(e)
		res.sendStatus(500)
	}
})

router.post('/', async (req, res, next) => {
	try {
		let results = await db.create(
			req.body.colorName, 
			req.body.colorSwatch, 
			req.body.brandName
		)
		res.json(results)
	} catch (e) {
		console.log(e)
		res.sendStatus(500)
	}
})

router.patch('/:id', async (req, res, next) => {
	try {
		let results = await db.update(
			req.body.colorName,
			req.body.colorSwatch,
			req.body.brandName,
			req.params.id
		)
		res.json(results)
	} catch (e) {
		console.log(e)
		res.sendStatus(500)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		let results = await db.delete(req.params.id)
		res.json(results)
	} catch (e) {
		console.log(e)
		res.sendStatus(500)
	}
})


module.exports = router