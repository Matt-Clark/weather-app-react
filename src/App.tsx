import { useState, useEffect } from 'react';
import axios from 'axios';

import type { WeatherAPIResponse, Unit } from './Types';
import {
  isEmptyObject,
  convertTemp,
  convertVisibility,
  convertPrecipitation,
  convertWindSpeed
} from './utils';

import Search from './form/Search';
import UnitSwitch from './form/UnitSwitch';
import Effects, { type TimeValues } from './effects/Effects';
import Weather from './weather/Weather';

import './App.css';

function App() {
  const [cityName, setCityName] = useState('');
  const [units, setUnits] = useState<Unit>('imperial');
  const [weatherData, setWeatherData] = useState<WeatherAPIResponse>({});

  const APIKey = import.meta.env.VITE_OWAPI_KEY;

  const timeValues: TimeValues = {
    current: (weatherData?.dt) ? weatherData.dt : 0,
    sunrise: (weatherData?.sys?.sunrise) ? weatherData.sys.sunrise : 0,
    sunset: (weatherData?.sys?.sunset) ? weatherData.sys.sunset : 0,
    offset: (weatherData?.timezone) ? weatherData.timezone : 0
  };

  function buildAPIURL() {
    return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&lang=en&APPID=${APIKey}`;
  }

  function updateCityName(value: string): void {
    setCityName(value);
  }

  const getWeather = (): void => {
    try {
      setWeatherData({});

      axios.get( buildAPIURL() ).then( (response) => {
        if( !isEmptyObject(response.data) && units === 'imperial' ){
          if( !!response.data?.visibility ){
            response.data.visibility = convertVisibility(response.data.visibility, units);
          }

          if( !!response.data?.rain ){
            response.data.rain['1h'] = convertPrecipitation(response.data.rain['1h'], units);
          }

          if( !!response.data?.snow ){
            response.data.snow['1h'] = convertPrecipitation(response.data.snow['1h'], units);
          }
        }

        setWeatherData(response.data);
      });
    } catch ( error ){
      console.error("Error fetching weather:", error);
      throw new Error("Failed to fetch weather");
    } finally {
      setCityName('');
    }
  }

  function toggleUnits(): void {
    setUnits( (units === 'imperial') ? 'metric' : 'imperial' );
  }

  useEffect( () => {
    if( !isEmptyObject(weatherData) ){
      let converted = {...weatherData};

      if( !!converted?.main ){
        converted.main.temp = convertTemp(converted.main.temp, units);
        converted.main.temp_max = convertTemp(converted.main.temp_max, units);
        converted.main.temp_min = convertTemp(converted.main.temp_min, units);
      }

      if( !!converted?.wind ){
        converted.wind.speed = convertWindSpeed(converted.wind.speed, units);

        if( !!converted.wind?.gust ){
          converted.wind.gust = convertWindSpeed(converted.wind.gust, units);
        }
      }

      if( !!converted?.visibility ){
        converted.visibility = convertVisibility(converted.visibility, units);
      }

      if( !!converted?.rain ){
        converted.rain['1h'] = convertPrecipitation(converted.rain['1h'], units);
      }

      if( !!converted?.snow ){
        converted.snow['1h'] = convertPrecipitation(converted.snow['1h'], units);
      }

      setWeatherData(converted);
    }
  }, [units]);

  return (
    <>
      <Effects 
        timeValues={timeValues} 
        condition={
          ( Array.isArray(weatherData?.weather) ) 
            ? weatherData.weather[0].id 
            : 0
        } 
      />

      <div className="search">
        <Search 
          cityName={cityName} 
          handleChange={updateCityName} 
          handleEnter={getWeather} 
        />

        <UnitSwitch 
          units={units} 
          handleClick={toggleUnits} 
        />
      </div>

      {!isEmptyObject(weatherData) && <Weather data={weatherData} units={units} />}
    </>
  );
}

export default App;
