const yargs = require("yargs");

const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

//var geocodeObj = {};

const argv = yargs.options({
    a: {
        demand: true,
        alias: "address",
        describe: "Address to fetch weather for",
        string: true
    }
}).help().alias("help", "h").argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    }else{
        /*for(var key in results){
            geocodeObj[key] = results[key];
        }*/
        weather.getWeather(results, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            }else{
                console.log(`It's currently ${weatherResults.temperature} in ${results.address}, feels like: ${weatherResults.apparentTemperature}`);
            }
        });
    }
});

/*setTimeout(() => {
    weather.getWeather(geocodeObj, (errorMessage, weatherResults) => {
        if(errorMessage){
            console.log(errorMessage);
        }else{
            console.log(`Temperature in ${geocodeObj.address} is: ${weatherResults.temperature}, apparent temperature is: ${weatherResults.apparentTemperature}`);
        }
    });
}, 1000);*/
