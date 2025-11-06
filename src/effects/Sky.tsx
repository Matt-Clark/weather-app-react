import clsx from 'clsx';
import { type Period } from '../Types';

import './Sky.css';

interface SkyProps {
  period: Period;
}

export default function Sky({
  period = 'none'
}: SkyProps ){
  const classes = clsx('sky', period);

  return <div className={classes}></div>
}

export type { SkyProps };