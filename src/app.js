const express = require('express')
const request = require('request')
const hbs = require('hbs')

const path = require('path')

const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')


const app = express()

const publicDirPath = path.join(__dirname, '../public')
const viewDirPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partialviews')

app.set('view engine', 'hbs')
app.set('views',viewDirPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirPath))



app.get('', (req,res)=>{
    res.render('index',{
        title:'Home',
        name:'omar'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'omar'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About',
        name:'omar'
    })
})




app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({error:'address is required'})
    }

    getWeatherData(req.query.address, (resObj)=>{
        res.send(resObj)
    })

})

app.get('*', (req,res)=>{
    res.render('404',{
        name:'omar'
    })
})

function getWeatherData(address, callback){
    let resObj = {}
    geocode(address,(error, {latitude, longitude, location} ={})=>{
        if (error){
            return callback({error})
        }
        forcast(latitude,longitude,(error,forcastData)=>{
            if(error){
                return callback({error})
            }

            callback({location, forcastData})
        })
    })
}


app.listen(3000,()=>{
    console.log('server started on port 3000')
})