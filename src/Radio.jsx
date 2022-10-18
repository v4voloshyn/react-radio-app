import { useState, useEffect, useCallback } from 'react';

import { RadioBrowserApi } from 'radio-browser-api';
import AudioPlayer from 'react-h5-audio-player';
import { FILTERS } from './constants/filters';
import defaultImg from './assets/img/radio.svg';
import 'react-h5-audio-player/lib/styles.css';

export const Radio = () => {
	const [stations, setStations] = useState(null);
	const [stationFilter, setStationFilter] = useState('');
	const [filters, setFilters] = useState([]);

	const api = new RadioBrowserApi(fetch.bind(window), 'UKR Radio App');

	const setupAPI = useCallback(async (stationFilter) => {
		return api.searchStations({
			countryCode: 'UA',
			tag: stationFilter,
			limit: 30,
		});
		// eslint-disable-next-line
	}, []);

	const fetchFilters = async () => {
		const radioStations = await api.searchStations({
			countryCode: 'UA',
		});
		const tags = await radioStations.map((station) => station.tags);
		return [...new Set(tags.flat())];
	};

	const SetDefaultSrc = (event) => {
		event.target.src = defaultImg;
	};

	useEffect(() => {
		setupAPI(stationFilter).then((data) => setStations(data));
	}, [stationFilter, setupAPI]);

	useEffect(() => {
		fetchFilters().then((data) => setFilters(data));
	}, []);

	return (
		<div className='radio'>
			<div className='filters'>
				<span
					className={stationFilter === '' ? 'filter selected' : 'filter'}
					onClick={() => setStationFilter('')}
				>
					all
				</span>
				{FILTERS.map((filter) => (
					<span
						className={stationFilter === filter ? 'filter selected' : 'filter'}
						onClick={() => setStationFilter(filter)}
						key={filter}
					>
						{filter}
					</span>
				))}
			</div>
			<div className='stations'>
				{stations &&
					stations.map((station, index) => {
						return (
							<div className='station' key={index}>
								<div className='station-name'>
									<img
										className='logo'
										src={station.favicon}
										alt={station.name}
										onError={SetDefaultSrc}
									/>
									<div className='name'>{station.name}</div>
								</div>
								<AudioPlayer
									className='player'
									src={station.urlResolved}
									showJumpControls={false}
									layout='horizontal-reverse'
									volume={0.2}
									showFilledVolume={true}
									autoPlayAfterSrcChange={false}
									customProgressBarSection={[]}
									customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
								/>
							</div>
						);
					})}
			</div>
		</div>
	);
};
