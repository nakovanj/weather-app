const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')

const port = process.env.PORT || 3000

// forecast functions
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views') //the same as default
const partialsPath = path.join(__dirname, '../templates/partials') //the same as default

// set hbs engine and view path
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//set static directory to serve
app.use(express.static(path.join(__dirname, '../public')))



//app.com
//app.com/help
//app.com/about

// app.get('/help', (req, res) => {

//     res.send('Hello express HELP')

// })

// app.get('/about', (req, res) => {

//     res.send('<html><body><H1 style="background-color:powderblue;">This is about page.</H1></body></html>')

// })

app.get('', (req, res) => {  //route for hbs view render
    res.render('index', {
        title: 'WeatherApp',
        name: 'Mirko Fodor'
    })
})

app.get('/about', (req, res) => {  //route for hbs view render
    // console.log('render rut: ', app.get('views'))
    res.render('about', {
        title: 'WeatherApp-About',
        name: 'Mirko Fodor'
    })
})

app.get('/help', (req, res) => {  //route for hbs view render
    res.render('help', {
        title: 'WeatherApp - Help',
        helpMessage: 'this is the help message',
        name: 'Mirko Fodor'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address term must be provided!'
        })
    }

    geocode(req.query.address, (error, { location, lat: latitude, lng: longitude } = {}) => {
        // default empty object is needed for cases where data is defined 
        if (error) {
            return res.send({ error: error })
        }
        forecast(latitude, longitude, (error, fdata) => {
            if (error) {
                return res.send({ error: error })
            }
            res.send({
                address: {
                    Address: location, latitude: latitude,
                    longitude: longitude
                },
                forecast: fdata,
                location: req.query.address
            })
        })
    })



})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: 'You must provide search term' })

    }

    res.send({
        products: []
    })

})


app.get('/help/*', (req, res) => {  //route for hbs view render
    res.send('Help article not found')
})

app.get('*', (req, res) => {
    res.send('My 404 page')
})

//heroku sets env var
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})  //port=3000

