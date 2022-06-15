import React from 'react';

function Header() {
	return (
		<header>
			<span role="img" aria-label="movie icon" className="movie-icon left">
				🎬
			</span>
			<h1>Streamables</h1>
			<span role="img" aria-label="movie icon" className="movie-icon right">
				🎞
			</span>
		</header>
	);
}

export default Header;
