const request = require("request");

var geocodeAddress = (argvAddress) => {
    var encodedAddress = encodeURIComponent(argvAddress);

    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if(error){
            console.log("Unable to connect to Google servers.");
        }else if(body.status === "ZERO_RESULTS"){
            console.log("Unable to find that address.");
        }else if(body.status === "OK"){
            console.log(`Address: ${body.results[0].formatted_address}`);
            console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
        }else{
            console.log("Something going wrong, try later");
        }
    });
};

// module.exports.geocodeAddress = geocodeAddress;

module.exports = {
    geocodeAddress
};