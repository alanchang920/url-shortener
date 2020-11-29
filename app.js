const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const routes = require('./routes')
require('./config/mongoose')

const PORT = process.env.PORT || 3000
const app = express()


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
