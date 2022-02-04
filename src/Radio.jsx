import { useState, useEffect } from "react";

import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import defaultImg from './assets/img/radio.svg';

export const Radio = () => {

   const [stations, setStations] = useState();
   const [stationFilter, setStationFilter] = useState('');
   
   useEffect(() => {
         setupAPI(stationFilter).then(data => setStations(data))
   }, [stationFilter])
   
   const setupAPI = async (stationFilter) => {
      const api = new RadioBrowserApi(fetch.bind(window), 'UKR Radio App');

      const stations = await api.searchStations({
         countryCode: 'UA',
         tag: stationFilter,
         limit: 30,
      })

      return stations;
   }

   const SetDefaultSrc = (event) => {
      event.target.src = defaultImg;
   }
   
   const filters = [
      'dance',
      'house',
      'jazz',
      'pop music',
      'rock',
      'rap',
      'eclectic',
      'atmospheric',
      'alternative',
      'folk',
      'music'
   ]
   
  return (
   <div className="radio">
      <div className="filters">
      <span className={stationFilter === '' ? 'filter selected' : 'filter'}
            onClick={() => setStationFilter('')}
      >all</span>
         {filters.map(filter => {
            return (<span className={stationFilter === filter ? 'filter selected' : 'filter'} 
            onClick={() => setStationFilter(filter)}
            key={filter}>{filter}
            </span>)
         })}
      </div>
      <div className="stations">
         {stations && stations.map((station, index) => {
            return (
               <div className="station" key={index}>
                  <div className="station-name">
                     <img className="logo" 
                        src={station.favicon} 
                        alt={station.name} 
                        onError={SetDefaultSrc} 
                     />
                     <div className="name">{station.name}</div>
                  </div>
                  <AudioPlayer className="player" 
                     src={station.urlResolved}
                     showJumpControls={false}
                     layout='horizontal-reverse'
                     volume={0.2}
                     showFilledVolume={true}
                     autoPlayAfterSrcChange={false}
                     customProgressBarSection={[]}
                     customControlsSection={['MAIN_CONTROLS','VOLUME_CONTROLS']}
                  />
               </div>
            )
         })}
      </div>
   </div>
   )
};
