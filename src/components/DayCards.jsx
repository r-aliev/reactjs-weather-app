import React from 'react';
import moment from 'moment';
import iconCodeMapping from '../WeatherIcon';

const DayCards = ({ onClick, forecastList, isSelected, unit, locale }) => {
  if (forecastList !== undefined && forecastList.length > 0) {
    const first = forecastList[0];
    const tempMaxAndMin = forecastList.reduce(
      (acc, current) => {
        if (current.temp_max > acc.max) acc.max = current.temp_max;
        if (current.temp_min < acc.min) acc.min = current.temp_min;
        return acc;
      },
      { max: Number.MIN_VALUE, min: Number.MAX_VALUE },
    );
    return (
      <div className="root">
        <div className={['card-container', isSelected ? 'selected' : null].join(' ')} onClick={onClick}>
          <img className="icon" src={iconCodeMapping[first.icon]} />
          <div className="text">{moment.unix(first.dt).locale(locale).format('dddd')}</div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="text mr-4">
              {Math.round(tempMaxAndMin.max * 10) / 10}
              &deg;
              {unit === 'metric' ? 'C' : 'F'}
            </div>
            <div className="text">
              {Math.round(tempMaxAndMin.min * 10) / 10}
              &deg;
              {unit === 'metric' ? 'C' : 'F'}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div />;
};

export default DayCards;

