const request = require("request")

const geocode = (address, callback) =>{
    const token = "pk.eyJ1Ijoib21hcjE0IiwiYSI6ImNqdTlwd3ZiMzBsdjYzeXBkMmJ4cDR0dzYifQ.Ghlv7MCv88FUH722XgmLjA"
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=" + token

    request({url, json:true}, (err, {body})=>{

        let errorMsg = undefined
        let data = undefined

        if(err){
            errorMsg = "unable to connect to the location service"
        }else if(body.message){
            errorMsg = res.body.message
        } else if(body.features.length == 0){
            errorMsg = "there is no locations match your search"
        }else{
            data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name 
            }
        }

        callback(errorMsg, data)
    })
}


module.exports = geocode