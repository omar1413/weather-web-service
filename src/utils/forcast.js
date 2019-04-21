const request = require("request")

const forcast = (lat, long, callback) => {

    const url = "https://api.darksky.net/forecast/fcf3eea7b0b47d7ffb61ed729e8c9c70/"+lat+","+long+"?units=si"
    let msgError = undefined
    let data = undefined
    request({
        url,
        json: true
    }, (err, {body}) => {
        if (err) {
            msgError = "can not access darksky service"
        } else if (body.error) {
            msgError = body.error
        }
        else {
            data = {
                temp: body.currently.temperature,
                summary : "Its currently " + body.currently.temperature + " degree out. there is a " + body.currently.precipProbability + "%" + " chance of rain"
            }
        }

        callback(msgError, data)
    })

}

module.exports = forcast