import type { Unit } from './Types';

export function isEmptyObject(obj: any): boolean {
  if( typeof obj !== 'object' || obj === null ){
    return false;
  }

  return Object.keys(obj).length === 0;
}

export function convertTemp( temp: number, units: Unit ): number {
  if( units === 'imperial' ){
    return (temp * (5 / 9)) + 32;
  } else if( units === 'metric' ){
    return (temp - 32) * (9 /5);
  }
  
  return temp;
}

export function convertWindSpeed( speed: number, units: Unit ): number {
  if( units === 'imperial' ){
    return speed * 2.2369362920544;
  } else if( units === 'metric' ){
    return speed / 2.2369362920544;
  }
  
  return speed;
}

export function convertVisibility( dist: number, units: Unit ): number {
  if( units === 'imperial' ){
    return dist / 1609.344;
  } else if( units === 'metric' ){
    return dist * 1609.344;
  }
  
  return dist;
}

export function convertPrecipitation( amnt: number, units: Unit ): number {
  if( units === 'imperial' ){
    return amnt / 25.4;
  } else if( units === 'metric' ){
    return amnt * 25.4;
  }
  
  return amnt;
}