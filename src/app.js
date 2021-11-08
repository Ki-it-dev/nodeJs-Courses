const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')
const methodOverride = require('method-override')
const sortMiddlewares = require('./app/controllers/middlewares/SortMiddlewares')
const app = express()
const port = 3000

const route = require('./router')

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//Middlewares
app.use(sortMiddlewares)
//Connet to database
const db = require('./config/db')
db.connect()

//Image
app.use(express.static(path.join(__dirname, 'public')))
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
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    
    sortable: (field, sort) => {
      const sortType = field === sort.column ? sort.type: 'default'
      const icons = {
        default: 'oi oi-elevator',
        asc: 'oi oi-sort-ascending',
        desc: 'oi oi-sort-descending',
      }
      const types = {
        default:'desc',
        asc: 'desc',
        desc:'asc',
      }

      const icon = icons[sortType]
      const type = types[sortType]

      return `
          <a href="?_sort&column=${field}&type=${type}">
            <span class="${icon}"></span>
          </a>
          `
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

//Show localhost
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

