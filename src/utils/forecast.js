const request = require('request')
const geocode = require('./geocode')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })

const forecast = (latitude, longitude, callbackfn) => {
    
    const lat =  latitude //parseFloat(latitude.replace(",", "."))
    const long = longitude //parseFloat(longitude.replace(",", "."))

    if (lat > 90 || lat < -90 || long > 180 || long < -180) {
        callbackfn('Incorrect coordinates: {' + lat + ' , ' + long + '}', undefined)
    }else{
        const baseUrl = 'http://api.weatherstack.com/current?access_key=dac23a65773bf1852e535a1b33cb9c38'
        const queryUrl = baseUrl + '&' + 'units=m' + '&' + 'query=' + lat + ',' + long
        
       // console.log(queryUrl)
        request({url: queryUrl, json: true}, (error, {body} = {}) => { //object destruction, take body
            //default body {} is needed for cases when data is undefined and error is defined
             
            if(error) {
                callbackfn('##Error: ' + error, undefined)
            }else if (body.error){
                callbackfn('#Weather Banana. ', undefined)
            }else{
                const {weather_descriptions, temperature, feelslike} = body.current
                callbackfn(undefined, weather_descriptions[0] + '. It is currently ' + temperature +
                ' but it feels like ' + feelslike )
            }
            
        })
        
    }}

module.exports = forecast