const axios = require('axios');

const handler = async function (event) {
	const id = event.queryStringParameters.id;

	const API_SECRET = process.env.REACT_APP_IMDB_API_KEY;

	const url = `https://imdb-api.com/API/YouTubeTrailer?apiKey=${API_SECRET}&id=${id}`;

	try {
		const { data } = await axios.get(url);
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
