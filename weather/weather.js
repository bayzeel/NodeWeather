const request = require("request");

var getWeather = (coords, callback) => {
    request({
        url: `https://api.darksky.net/forecast/84382f3d7d036443ebbed7cb0092e179/${coords.latitude},${coords.longitude}?units=si`,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                latitude: body.latitude,
                longitude: body.longitude
            });
        }else{
            callback("Unable to fetch weather");
        }
    });
};

module.exports = {
    getWeather
};