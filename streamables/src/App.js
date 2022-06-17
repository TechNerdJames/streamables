import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Search from './components/Search';
import Entertainment from './components/Entertainment';
import InfoCardModal from './components/InfoCardModal';

function App() {
	// creating a search state to save user input, also passing down as a prop
	const [search, setSearch] = useState('');
	// creating timeoutID state to capture the timeoutID to be able to clear it
	const [timeoutId, setTimeoutId] = useState('');
	// saving api response to state
	const [searchList, setSearchList] = useState([]);

	const [selectedMedia, setSelectedMedia] = useState();

	// function to handle the search input change and capture user input in search state. Passing as prop
	function handleChange(event) {
		// cleartimeout to cancel previous API calls
		clearTimeout(timeoutId);
		setSearch(event.target.value);
		// To debounce the search input
		const timeout = setTimeout(() => fetchData(event.target.value), 500);
		setTimeoutId(timeout);
	}

	async function fetchData(searchString) {
		// making API call
		const response = await axios.get(
			`/.netlify/functions/fetchData?s=${searchString}`
		);
		// saving the query response to the search list state
		setSearchList(response.data.Search);
	}

	useEffect(() => {
		const body = document.querySelector('body');
		body.style.overflow = selectedMedia ? 'hidden' : 'auto';
	}, [selectedMedia]);

	return (
		<>
			<Header />
			<Search search={search} handleChange={handleChange} />
			<section className="entertainment-container">
				{/* if searchList exist and has a length, map over it and display each as a movie/show component */}
				{searchList?.length ? (
					searchList.map((info, index) => (
						<Entertainment
							key={index}
							info={info}
							selectedMedia={setSelectedMedia}
						/>
					))
				) : (
					<div className="poster"></div>
				)}
				{selectedMedia && (
					<InfoCardModal
						selectedMedia={selectedMedia}
						setSelectedMedia={setSelectedMedia}
					/>
				)}
			</section>
		</>
	);
}

export default App;
