const yargs = require("yargs");
const axios = require("axios");


const argv = yargs.options({
    a: {
        demand: true,
        alias: "address",
        describe: "Address to fetch weather for",
        string: true
    }
}).help().alias("help", "h").argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
var globalAddress;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === "ZERO_RESULTS"){
        throw new Error("Unable to find that address.");
    }

    var coords = response.data.results[0].geometry.location;
    var weatherUrl = `https://api.darksky.net/forecast/84382f3d7d036443ebbed7cb0092e179/${coords.lat},${coords.lng}?units=si`;
    globalAddress = response.data.results[0].formatted_address;

    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`It's currently ${temperature} in ${globalAddress}. It feels like: ${apparentTemperature}`);
}).catch((error) => {
    if(error.code === "ENOTFOUND"){
        console.log("Unable to connect to API servers.");
    }else{
        console.log(error.message);
    }
});