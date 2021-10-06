const request = require('request')

const weathercode = (latitude, longitude , callback) =>{
    const weaUrl = 'http://api.weatherstack.com/current?access_key=d5897d30ff5c0f9fa4708dd7921d3598&query='+latitude+','+longitude+''
    request({url: weaUrl , json: true} , (error, response) =>{
        if(error){
            callback("Unable to connect to Weather App", undefined)
        }else if(response.body.error){
            callback("Unable to find the location", undefined)
        }else{
            callback(undefined, "It is currently "+"" +response.body.current.temperature + "degree but feels like "+"" +response.body.current.feelslike +'degree and Humidity is '+response.body.current.humidity)
        }
    })
}

module.exports = weathercode