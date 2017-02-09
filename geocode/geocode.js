const request = require("request");

var geocodeAddress = (argvAddress, callback) => {
    var encodedAddress = encodeURIComponent(argvAddress);

    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if(error){
            callback("Unable to connect to Google servers.");
        }else if(body.status === "ZERO_RESULTS"){
            callback("Unable to find that address.");
        }else if(body.status === "OK"){
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }else{
            console.log("Something going wrong, try later");
        }
    });
};

// module.exports.geocodeAddress = geocodeAddress;

module.exports = {
    geocodeAddress
};