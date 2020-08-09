const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');

const geocode = require('./src/geocode');
const forecast = require('./src/forecast');

const public_dir = path.join(__dirname, 'public')
const viewsPath = path.join(__dirname, 'templates/views');
const partialsPath = path.join(__dirname, 'templates/partials');

const config = require('./src/config');

app.set('view engine', 'hbs');

//Setting view folder
app.set('views', viewsPath);

//Register partials
hbs.registerPartials(partialsPath);

//This is the path for route handler
app.use(express.static(public_dir));

app.get('', (req, res) => {
	res.render('index', {
		title : "Weather",
		name : "Harell B. Juanico"
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title : "Help",
		name : "Harell B. Juanico"
	});
});

app.get('/weather', (req, res) => {

	if (!req.query.address) {
		return res.send({
			error : "You must provide an address."
		});
	}

	geocode.get(req.query.address + '.json', (error, { latitude, longitude, location } = {} ) => {

		if (error) {
			return res.send({ error });
		}

		const forecastDetails = forecast.get({latitude, longitude}, (error, { temperature, feelslike, description } = {} ) => {
			if (error) {
				return res.send({ error });
			}

			if (description !== "") {
				description = " It is " + description;
			}

			return res.send({
				forecast : "It is currently " + temperature +" degrees in "+location+"." +description,
				location,
				address : req.query.address,
			});
		});	
	});

});

app.get('/*/*', (req, res) => {
	res.render('404', {
		title : "Help article not found",
		name : "Harell B. Juanico"
	});
});

//Match anything *
app.get('*', (req, res) => {
	res.render('404', {
		title : "404 - Page not Found",
		name : "Harell B. Juanico"
	});
});

app.listen(config.port, () => {
	console.log('Server is running in port ' +config.port);
})