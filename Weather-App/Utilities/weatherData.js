const request = require('request');
const constants = require('../config');

const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    request({url, json:true}, (error, {body})=> {
        if(error) {
            callback("Can't get data from Api ", undefined)
        } else if(!body.main || !body.main.temp || !body.name || !body.weather) {
            callback(" Location not found, try again", undefined);
        } else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}

module.exports = weatherData;