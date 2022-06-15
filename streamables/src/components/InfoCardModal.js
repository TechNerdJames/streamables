import React, { useEffect, useState } from 'react';
import axios from 'axios';
import netflix from '../images/netflix-icon.png';
import disney from '../images/disney-plus.png';
import appletv from '../images/apple-tv.png';
import google from '../images/google-play.png';
import amazon from '../images/prime-video.png';
import youtube from '../images/youtube.png';
import smallYoutube from '../images/small-youtube.png';
import posterHolder from '../images/poster-holder.jpeg';

export default function InfoCardModal(props) {
	const { selectedMedia } = props;
	const [mediaInfo, setMediaInfo] = useState();
	const [youtubeData, setYoutubeData] = useState();

	useEffect(() => {
		axios
			.get(
				`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${selectedMedia}`
			)
			.then((data) => setMediaInfo(data.data));
	}, [selectedMedia]);

	useEffect(() => {
		const options = {
			method: 'GET',
			url: 'http://localhost:8000/links',
			params: { source_id: selectedMedia, source: 'imdb', country: 'ca' },
		};
		axios.request(options).then((response) =>
			setMediaInfo((prevInfo) => ({
				...prevInfo,
				links: response.data.collection.locations,
			}))
		);
	}, [selectedMedia]);

	useEffect(() => {
		axios
			.get(
				`https://imdb-api.com/API/YouTubeTrailer?apiKey=${process.env.REACT_APP_IMDB_API_KEY}&id=${selectedMedia}`
			)
			.then((data) => setYoutubeData(data.data));
	}, [selectedMedia]);

	return (
		<div className="modal-overlay">
			<div className="modal">
				{mediaInfo ? (
					<>
						<div className="close-btn">
							<button id="closeBtn" onClick={() => props.setSelectedMedia()}>
								X
							</button>
						</div>
						<div className="modal-content">
							<div className="modal-img-container">
								<img
									src={
										mediaInfo.Poster !== 'N/A' ? mediaInfo.Poster : posterHolder
									}
									alt={`${mediaInfo.Title} poster`}
									className="modal-img"
								/>
							</div>
							<div className="info-content">
								<p className="capitalized media-title">
									{mediaInfo?.Type}: {mediaInfo?.Title}
								</p>
								<p className="media-info">
									IMDB Rating:{' '}
									<span className="opacity">{mediaInfo?.imdbRating}</span>
								</p>
								<p className="media-info">
									Release Date:{' '}
									<span className="opacity">{mediaInfo?.Released}</span>
								</p>
								<p className="media-info">
									Genre: <span className="opacity">{mediaInfo?.Genre}</span>
								</p>
								<p className="media-info">
									Rated: <span className="opacity">{mediaInfo?.Rated}</span>
								</p>
								<p className="media-info">
									Plot: <span className="opacity">{mediaInfo?.Plot}</span>
								</p>

								<p className="media-info watch">Watch: </p>
								<div className="links-container">
									{mediaInfo.links ? (
										<>
											<div className="streaming">
												{mediaInfo.links &&
													mediaInfo.links.map((link) => (
														<span key={link.id} className="stream-link">
															<a
																href={link.url}
																key={link.id}
																target="_blank"
																rel="noreferrer noopener"
															>
																{link.display_name === 'Netflix' ? (
																	<img
																		src={netflix}
																		alt={link.display_name}
																		key={link.id}
																		className="link-icon"
																	/>
																) : null}
																{link.display_name === 'Amazon Prime Video' ? (
																	<img
																		src={amazon}
																		alt={link.display_name}
																		key={link.id}
																		className="link-icon"
																	/>
																) : null}
																{link.display_name === 'AppleTV+' ||
																link.display_name === 'iTunes' ? (
																	<img
																		src={appletv}
																		alt={link.display_name}
																		key={link.id}
																		className="link-icon"
																	/>
																) : null}

																{link.display_name === 'Disney+' ? (
																	<img
																		src={disney}
																		alt={link.display_name}
																		key={link.id}
																		className="link-icon"
																	/>
																) : null}
																{link.display_name === 'Google Play' ? (
																	<img
																		src={google}
																		alt={link.display_name}
																		key={link.id}
																		className="link-icon"
																	/>
																) : null}
																{link.display_name === 'YouTube Premium' ? (
																	<img
																		src={youtube}
																		alt={link.display_name}
																		key={link.id}
																		className="link-icon"
																	/>
																) : null}
															</a>
														</span>
													))}
											</div>
										</>
									) : (
										<h4>Loading...</h4>
									)}

									{youtubeData ? (
										<a
											href={youtubeData.videoUrl}
											target="_blank"
											rel="noreferrer noopener"
											className="trailer"
										>
											<img
												src={smallYoutube}
												alt="youtube icon"
												className="small-youtube"
											/>
											Watch Trailer
										</a>
									) : null}
								</div>
							</div>
						</div>
					</>
				) : (
					<h2>Loading...</h2>
				)}
			</div>
		</div>
	);
}
