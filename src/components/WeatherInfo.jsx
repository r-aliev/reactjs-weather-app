import React from 'react';
import moment from 'moment';
import iconCodeMapping from '../WeatherIcon';

import {dir} from './helper'

const WeatherInfo = ({ location, forecastOfDay, unit, locale, onLocationClick }) => {
    let [tabId, setTabId] = React.useState(0)
    const localeRegion = 'zh-tw';

    return (
      <div>
        <div className="location-text" onClick={onLocationClick}>{location}</div>
        <div className="banner-container">
          <img className="banner-icon" src={iconCodeMapping[forecastOfDay[tabId].icon]} />
          <div className="temperature">{Math.round(forecastOfDay[tabId].temp * 10) / 10}</div>
          <div className="unit">
            &deg;
            {unit === 'metric' ? 'C' : 'F'}
          </div>
          <div style={{ flex: '1' }} />
          <div className="detail-container">
            <div className="info-text"> Clouds: {forecastOfDay[tabId].clouds}% </div>
            <div className="info-text"> Pressure: {forecastOfDay[tabId].pressure}hPa </div>
            <div className="info-text"> Humidity: {forecastOfDay[tabId].humidity}%</div>
            <div className="info-text">
              Wind: <>
                {forecastOfDay[tabId].wind.speed}
                {unit === 'metric' ? 'm/s' : 'mph'}
                {', '}
                {dir(forecastOfDay[tabId].wind.deg)}
              </>
            </div>
            <div className="info-text"> Precitipation: {forecastOfDay[tabId].rain}mm </div>
          </div>
        </div>
        <div className="tabs">
          {
            forecastOfDay.map((el,i) => {
              return (<div className={["tab", tabId === i ? 'active': null].join(' ')} key={i} onClick={() => setTabId(i)}>
                {moment.unix(el.dt).locale(localeRegion).format('a h:mm')}
              </div>)
            })
          }
        </div>
      </div>
    );
} 

export default WeatherInfo;

