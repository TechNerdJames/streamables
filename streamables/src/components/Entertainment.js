import React from 'react';
import posterHolder from '../images/poster-holder.jpeg';

function Entertainment(props) {
	const { Poster, Title, Type, Year, imdbID } = props.info;

	return (
		<div
			className="entertainment-items"
			onClick={() => props.selectedMedia(imdbID)}
		>
			<img
				src={Poster !== 'N/A' ? Poster : posterHolder}
				alt={`${Title} Poster`}
				className="poster-img"
			/>
			<p>{Title}</p>
			<div className="entertainment-info">
				<span className="capitalized">Type: {Type}</span>
				<span>Year: {Year}</span>
			</div>
		</div>
	);
}

export default Entertainment;
