const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmVudW9hZjA2IiwiYSI6ImNrOWw2a2xuaDAxa3MzbXA1bzZjbHNodWEifQ.LIa3Aql1zCA2RYq0mehjPg&limit=1'

    //we can use shorthand for url:url with only url
    //Object destructuring for response as {body}={}  so that we dont need reference with response.body
    request({url: url, json:true}, (error, response)=> {
        if(error) {
            //If we do not provide any argument for the second one it is by default Undefined
            callback('Unable to connect to location services!', undefined)           
        }else if(response.body.features.length == 0){
            callback('Unable to find the location. Try another search!', undefined)           
        }else{
            callback(undefined, {
                lattitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    }) 
}

module.exports = geocode