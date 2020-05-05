const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=89386aa5aa10a5d90099fa44602c8f22&query='+ lattitude +','+ longitude +'&units=m'
    //we can use shorthand for url:url with only url
    //Object destructuring for response as {body}={}
    request({url: url, json:true}, (error, response) => {
        if(error){
            callback('Unable to connect weather services!', undefined)
        }else if(response.body.error){
            callback('Unable to find the location!', undefined)
        }else{
            callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees.The humidity is ${response.body.current.humidity}%.`)
        }
    })
}

module.exports = forecast