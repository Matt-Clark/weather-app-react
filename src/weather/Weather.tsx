import type { WeatherAPIResponse, Unit } from '../Types';
import { isEmptyObject } from '../utils';

import Expanded from './Expanded';

import './Weather.css';

interface WeatherProps {
  data: WeatherAPIResponse;
  units: Unit;
}

export default function Weather({
  data = {},
  units = 'imperial'
}: WeatherProps){
  if(isEmptyObject(data)) return null;

  return (
    <>
      <div className="current-conditions">
        <h1>{data.name}</h1>
        <h2>{Math.round(data.main?.temp ?? 0)}<span>&deg;</span></h2>

        <div className="temp-range">
          <p className="temp-high"><span>H:</span> {Math.round(data.main?.temp_max ?? 0)}&deg;</p>
          <p className="temp-low"><span>L:</span> {Math.round(data.main?.temp_min ?? 0)}&deg;</p>
        </div>
        
        <h3>{ ( Array.isArray(data?.weather) ) ? data.weather[0].main : ''}</h3>
      </div>

      <Expanded data={data} units={units} />
    </>
  );
}