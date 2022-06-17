const axios = require('axios');

const handler = async function (event) {
	const sourceId = event.queryStringParameters.source_id;

	const API_SECRET = process.env.REACT_APP_UTELLY_API_KEY;

	const url = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=${sourceId}&source=imdb&country=ca`;

	try {
		const { data } = await axios.get(url, {
			headers: {
				'X-RapidAPI-Key': API_SECRET,
				'X-RapidAPI-Host':
					'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
			},
		});
		return {
			statusCode: 200,
			body: JSON.stringify(data),
		};
	} catch (error) {
		const { status, statusText, headers, data } = error.response;
		return {
			statusCode: status,
			body: JSON.stringify({ status, statusText, headers, data }),
		};
	}
};

module.exports = { handler };
