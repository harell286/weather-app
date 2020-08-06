const request = require('postman-request');
const config = require('./config');

const base_url = "http://api.mapbox.com/geocoding/v5/mapbox.places/";
const access_key = config.mapbox_access_key;

const get = (city, callback) => {

	const url = base_url + encodeURIComponent(city) + '?access_token=' + access_key + '&limit=1';

	request({ url : url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback('Unable to connect.', undefined);
		} else if (body.message) {
			callback(body.message, undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location.', undefined);
		} else {
			try {
				const features = body.features[0];

				callback(undefined, {
					longitude : features.center[0],
					latitude : features.center[1],
					location : features.place_name
				})

			} catch (e) {
				console.log(e);
			}	
		}
	});
}

module.exports = {
	get
}