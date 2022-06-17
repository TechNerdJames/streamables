import React from 'react';

function Search(props) {
	// Destructuring props
	const { search, handleChange } = props;

	return (
		<div className="search-input flex-ac">
			<i className="fa-solid fa-magnifying-glass"></i>
			<input
				type="text"
				name="search"
				placeholder="Search for movie or TV series"
				onChange={handleChange}
				// setting value of input to the search state to control input.
				value={search}
			/>
		</div>
	);
}

export default Search;
