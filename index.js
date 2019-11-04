const express = require('express')
const dotenv 	= require('dotenv')

const apiRouterDesigns = require('./routes/designsRouter.js')
const apiRouterColors = require('./routes/colorsRouter.js')
const apiRouterYarnTypes = require('./routes/yarntypesRouter.js')
const apiRouterYarnWeights = require('./routes/yarnweightsRouter.js')
const apiRouterCrochetHooks = require('./routes/crochethooksRouter.js')
const apiRouterFandoms = require('./routes/fandomsRouter.js')

const app = express()
app.use(express.json())

dotenv.config()

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
})

app.use('/api/yarntypes', apiRouterYarnTypes)
app.use('/api/yarnweights', apiRouterYarnWeights)
app.use('/api/colors', apiRouterColors)
app.use('/api/crochethooks', apiRouterCrochetHooks)
app.use('/api/fandoms', apiRouterFandoms)
app.use('/api/designs', apiRouterDesigns)

app.listen(process.env.PORT || '3000', () => {
	console.log(`Server is running on port: ${process.env.PORT || '3000'}`)
})