const request = require('postman-request');
const config = require('./config');

const get = ({ latitude = 0, longitude = 0 }, callback) => {

	url = parseUrl({latitude, longitude});

	request({ url : url, json: true }, (error, {body} = {}) => {
		if (error) {
			callback('Unable to connect to weather services', undefined);
		} else if (body.error) {
			console.log(body.error);
			callback(body.error.info, undefined);
		} else {
			try {
				const current = body.current;

				var description="";

				current.weather_descriptions.forEach((value) => {
					description = description + value +  " " ;
				})

				callback(undefined, {
					description,
					temperature : current.temperature,
					feelslike : current.feelslike,
				})
			} catch (e) {
				console.log(e);
			}	
		}
		
	});	
}

const parseUrl = ({ latitude = 0, longitude = 0 }) => {
	const base_url = "http://api.weatherstack.com/";
	const api_method = "current";
	const access_key = config.weatherstack_access_key;
	const city =  latitude +','+ longitude;

	const params = [
		{
			name : "access_key",
			value : access_key
		},
		{
			name : "query",
			value : city
		}
	];

	var query_params = '?';

	params.forEach((param) => {
		query_params = `${query_params}${param.name}=${param.value}&`;
	});

	query_params = query_params.slice(0, -1);


	return base_url + api_method + query_params;
}

module.exports = {
	get
}