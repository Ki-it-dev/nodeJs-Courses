const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')
const methodOverride = require('method-override')
const app = express()
const port = 3001

const route = require('./router')

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//Connet to database
const db = require('./config/db')
db.connect()

//Image
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

//Route init
route(app)

//HTTP logger
app.use(morgan('combined'))

//Template engine
app.engine('hbs', handlebars({
  extname:'.hbs',
  helpers:{
    sum: (a,b) => a + b,
  }
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'resource','views'));

//Show localhost
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

