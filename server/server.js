const express = require('express')
const dotenv = require('dotenv')

const apiRouterColors = require('./routes/colorsRouter.js')
const apiRouterCommissions = require('./routes/commissionsRouter.js')
const apiRouterCrochetHooks = require('./routes/crochethooksRouter.js')
const apiRouterDesigns = require('./routes/designsRouter.js')
const apiRouterFandoms = require('./routes/fandomsRouter.js')
const apiRouterImages = require('./routes/imagesRouter.js')
const apiRouterLocations = require('./routes/locationsRouter.js')
const apiRouterStocklists = require('./routes/stocklistsRouter.js')
const apiRouterYarnTypes = require('./routes/yarntypesRouter.js')
const apiRouterYarnWeights = require('./routes/yarnweightsRouter.js')

const app = express()
app.use(express.json())

dotenv.config()

console.log(process.env.PORT)

app.use('/api/colors', apiRouterColors)
app.use('/api/commissions', apiRouterCommissions)
app.use('/api/crochethooks', apiRouterCrochetHooks)
app.use('/api/designs', apiRouterDesigns)
app.use('/api/fandoms', apiRouterFandoms)
app.use('/api/locations', apiRouterLocations)
app.use('/api/stocklists', apiRouterStocklists)
app.use('/api/yarntypes', apiRouterYarnTypes)
app.use('/api/yarnweights', apiRouterYarnWeights)

app.listen(process.env.PORT || '3000', () => {
	console.log(`Server is running on port: ${process.env.PORT || '3000'}`)
})