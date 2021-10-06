const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utlis/geocode')
const weathercode = require('./utlis/weathercode')

// import express from 'express'
// import path from 'path'

const app = express()

console.log(path.join(__dirname, '../public'))
//Define Path for express config
const publicDir = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(__dirname)
// console.log(__filename)


//setup handlebars enginee and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

// app.get('', (req, res)=>{
//     res.render('index.hbs')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Pratik Kulkarni",
        footerTitle: "Created by Pratik Kulkarni"

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Pratik Kulkarni",
        footerTitle: "Created by Pratik Kulkarni"

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: "Pratik Kulkarni",
        footerTitle: "Created by Pratik Kulkarni"
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must add a serach'
        })
    }
    res.send({
        products: []
    })
})

// app.get('/help', (req, res)=>{
//     res.send('<h1>Help page</h1>')
// })

// app.get('/about' , (req,res)=>{
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address , (error, {latitude , longitude , location}={})=>{
        if(error){
            return res.send({error})
        }

        weathercode(latitude , longitude ,(error , weatherData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast : weatherData,
                location: location,
                address: req.query.address
            })
        })
    })
    // res.send(
    //     {
    //         Forecast: 'Its Raining',
    //         location: 'Bengaluru',
    //         address: req.query.address
    //     }
    // )
})

//404 Page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page',
        name: "Pratik Kulkarni",
        msg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help Page',
        name: "Pratik Kulkarni",
        msg: 'Page not found'
    })
})


const port = 3000
app.listen(port, () => {
    console.log("Listing to port", port)
})


// D:\G7CR Technologies India Pvt Ltd\node-course\web-server\src
// D:\G7CR Technologies India Pvt Ltd\node-course\web-server\src\app.js