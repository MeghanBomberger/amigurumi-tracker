const express = require('express')
const db = require('../db/fandomsDB.js')

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
			req.body.fandom
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
			req.body.fandom,
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