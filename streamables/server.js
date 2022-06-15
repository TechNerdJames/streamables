const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());

app.get('/search/:searchString', async (req, res) => {
	const response = await axios.get(
		`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${req.params.searchString}`
	);
	res.json(response.data.Search);
});

app.get('/links', (req, res) => {
	const sourceId = req.query.source_id;

	const options = {
		method: 'GET',
		url: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup',
		params: { source_id: sourceId, source: 'imdb', country: 'ca' },
		headers: {
			'X-RapidAPI-Key': process.env.REACT_APP_UTELLY_API_KEY,
			'X-RapidAPI-Host':
				'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
		},
	};
	axios
		.request(options)
		.then((response) => {
			res.json(response.data);
		})
		.catch((error) => console.error(error));
});

app.listen(8000, () => console.log(`Backend is running on port ${PORT}`));
