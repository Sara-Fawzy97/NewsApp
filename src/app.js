const express = require("express")
const app = express()
const port = process.env.PORT || 3000;
const path = require('path')
const news = require('./tools/news')
const hbs = require('hbs')


//public path for static files
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

//hbs pages
app.set('view engine', 'hbs')
const viewPath = path.join(__dirname, '../templates/views')
app.set('views', viewPath)

const partialDirect = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialDirect)


//to display data 
app.get('/', (req, res) => {
    const url = 'https://newsapi.org/v2/top-headlines?country=eg&category=entertainment&apiKey=8940f66bd0584f0f816af6361b392c4a'

    if (!req.query) {
        return res.send({
            error: "error from appJs"
        })
    }
    news(url, (error, data) => {
        if (error) {
            return res.send(error)
        }
        res.render('index', {
            data: data.articles

        })
    })

})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 page',
        name: 'Default'
    })
})
app.listen(port, () => {
    console.log(`App listening at ${port}`)
})