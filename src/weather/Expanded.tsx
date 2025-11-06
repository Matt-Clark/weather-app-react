import type { WeatherAPIResponse, Unit } from '../Types';
import { isEmptyObject } from '../utils';

import './Expanded.css';

interface ExpandedProps {
  data: WeatherAPIResponse;
  units: Unit;
}

export default function Expanded({
  data = {},
  units = 'imperial'
}: ExpandedProps){
  if(isEmptyObject(data)) return null;

  let precipitation = 0;
  if( data?.rain && !!data.rain['1h'] ) {
    precipitation = data.rain['1h'];
  } else if( data?.snow && !!data.snow['1h'] ) {
    precipitation = data.snow['1h'];
  }

  let visibility = 0;
  if( !!data?.visibility ) {
    visibility = ( units === 'metric' ) ? data.visibility / 1000 : data.visibility;
    visibility = Math.round( visibility * 100 ) / 100;
  }

  return (
    <div className="expanded-info">
      <div className="glass-box">
        <h4>Feels like</h4>
        <p>{Math.round(data.main?.feels_like ?? 0)}<sup>&deg;</sup></p>
      </div>

      <div className="glass-box">
        <h4>Humidity</h4>
        <p>{Math.round(data.main?.humidity ?? 0)}<span>%</span></p>
      </div>

      <div className="glass-box wide">
        <h4>Wind</h4>
        <p><span>Speed:</span> {Math.round(data.wind?.speed ?? 0)}<span>{(units === 'imperial') ? 'mph' : 'm/s' }</span></p>
        <p><span>Gust:</span> {Math.round(data.wind?.gust ?? 0)}<span>{(units === 'imperial') ? 'mph' : 'm/s' }</span></p>
      </div>

      <div className="glass-box small-text">
        <h4>Visibility</h4>
        <p>{visibility}<span>{(units === 'imperial') ? 'mi' : 'km'}</span></p>
      </div>

      <div className="glass-box small-text">
        <h4>Precipitation</h4>
        <p>{precipitation}<span>{(units === 'imperial') ? 'in' : 'mm'}/hr</span></p>
      </div>
    </div>
  );
}