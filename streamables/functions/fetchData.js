const axios = require('axios');

const handler = async function (event) {
	const searchString = event.queryStringParameters.s;

	const API_SECRET = process.env.REACT_APP_OMDB_API_KEY;

	const url = `http://www.omdbapi.com/?apikey=${API_SECRET}&s=${searchString}`;

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
