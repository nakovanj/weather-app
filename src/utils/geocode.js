const request = require('request')

const geocode = (city, callback) => {
    
    const geoBase = 'https://geocode.search.hereapi.com/v1/geocode?apiKey=XgQiqy5HtLluaHd8IwKdgC5cpSMaiRQ-tVx9o7bjhhI'
    const geoUrl = geoBase + '&' + 'q=' + encodeURIComponent(city)
    
    //console.log(geoUrl)

    request({url: geoUrl, json: true}, (error, response) => {
        
        if(error) {
            callback(error, undefined)
        } else if (response.body.cause) {
            callback('Geobanana', undefined)
        } else if (response.body.items.length === 0) {
            callback('Geo did not found place.', undefined)
        }else{
            
            const current = response.body.items[0]
            //  console.log(current.address.city)
            //  console.log(current.position.lat)
            //  console.log(current.position.lng)
            callback(undefined, {location: response.body.items[0].title, lat: current.position.lat, 
                lng: current.position.lng})         
            }
            
        })
    }
    
    module.exports = geocode
    
