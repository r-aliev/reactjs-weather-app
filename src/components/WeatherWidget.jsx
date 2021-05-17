import React, { useState } from 'react';
import moment from 'moment';
import WeatherInfo from './WeatherInfo';
import DayCards from './DayCards';

import './styles.css'

const arr = [0,1,2,3,4]

const WeatherWidget = ({ config, forecast }) => {
  const [forecastIdx, setForecastIdx] = useState(0);

  if (forecast !== undefined && forecast.length > 0) {
    let firstMomentOfDay;
    let forecastOfDay = [];
    const forecastOfDayList = [];
    forecast.forEach((item, index) => {
      if (firstMomentOfDay === undefined) {
        firstMomentOfDay = moment.unix(item.dt);
        forecast[index].moment = firstMomentOfDay;
        forecastOfDay.push(item);
      } else {
        const currentMoment = moment.unix(item.dt);
        forecast[index].moment = currentMoment;
        if (firstMomentOfDay.isSame(currentMoment, 'day')) {
          forecastOfDay.push(item);
        } else {
          forecastOfDayList.push(forecastOfDay);
          forecastOfDay = [];
          forecastOfDay.push(item);
          firstMomentOfDay = currentMoment;
        }
      }
    });

    return (
      <div className="content-container">
        <WeatherInfo
          location={config.location}
          forecastOfDay={forecastOfDayList[forecastIdx]}
          unit={config.unit}
          locale={config.locale}
          onLocationClick={config.onLocationClick}
        />
        <div className="next-five-container">
          {
            arr.map((el) => {
              return (<DayCards
                key={el}
                onClick={() => setForecastIdx(el)}
                forecastList={forecastOfDayList[el]}
                isSelected={forecastIdx === el}
                unit={config.unit}
                locale={config.locale}
              />)
            })
          }
        </div>
      </div>
    );
  } else return ( <></> );
};

export default WeatherWidget;
