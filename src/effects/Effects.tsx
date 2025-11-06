import { type Period } from '../Types';

import Sky from './Sky';
import Fog from './Fog';
import Rain from './Rain';
import Snow from './Snow';
import Thunder from './Thunder';
import Clouds from './Clouds';
import Sun from './Sun';
import Moon from './Moon';

import './Effects.css';

type TimeValues = {
  current: number;
  sunrise: number;
  sunset: number;
  offset: number;
};

interface EffectsProps {
  timeValues?: TimeValues;
  condition?: number;
}

export default function Effects({
  timeValues = { current: 0, sunrise: 0, sunset: 0, offset: 0 },
  condition = 800
}: EffectsProps){
  let visibleSunOrMoon = true;
  const dawnStart = timeValues.sunrise - (30 * 60);
  const duskEnd = timeValues.sunset + (30 * 60);
  
  let timePeriod: Period = 'none';
  if( timeValues.current > 0 ){
    if( timeValues.current >= dawnStart && timeValues.current < timeValues.sunrise ){
      // b/w 30m before sunrise and sunrise = dawn
      timePeriod = 'dawn';
    } else if( timeValues.current >= timeValues.sunrise && timeValues.current < timeValues.sunset ){
      // sunrise to sunset = day
      timePeriod = 'day';
    } else if( timeValues.current >= timeValues.sunset && timeValues.current < duskEnd ){
      // sunset to 30m after sunset = dusk
      timePeriod = 'dusk';
    } else if( timeValues.current >= duskEnd || timeValues.current < dawnStart ){
      // more than 30m after sunset = night OR more than 30m before sunrise = night
      timePeriod = 'night';
    }
  }

  // weather condition effects
  // 800 clear, 801-804 cloudy, 701-781 ignore, 600-622 snowy, 300-321 & 500-531 rainy, 200-232 thunder
  let effectStates = {
    rain: false,
    snow: false,
    fog: false,
    clouds: false,
    thunder: false
  };

  switch(true){
    case condition === 800:
    case (condition > 700 && condition < 782):
      break;
    case (condition > 199 && condition < 233):
      effectStates.thunder = true;
      effectStates.clouds = true;
      visibleSunOrMoon = false;
      break;
    case (condition > 299 && condition < 322):
    case (condition > 499 && condition < 532):
      effectStates.rain = true;
      effectStates.clouds = true;
      visibleSunOrMoon = false;
      break;
    case (condition > 599 && condition < 623):
      effectStates.snow = true;
      effectStates.clouds = true;
      visibleSunOrMoon = false;
      break;
    case (condition > 800 && condition < 805):
      effectStates.clouds = true;
      break;
    case (condition === 741):
    default:
      effectStates.fog = true;
  }

  return (
    <div className="effects">
      <Sky period={timePeriod} />
      {visibleSunOrMoon && (
        <>
          {timePeriod === 'day' && <Sun />}
          {timePeriod === 'night' && <Moon />}
        </>
      )}
      {effectStates.fog && <Fog period={timePeriod} />}
      {effectStates.rain && <Rain period={timePeriod} />}
      {effectStates.snow && <Snow period={timePeriod} />}
      {effectStates.thunder && <Thunder period={timePeriod} />}
      {effectStates.clouds && <Clouds />}
    </div>
  );
}

export type { EffectsProps, TimeValues };