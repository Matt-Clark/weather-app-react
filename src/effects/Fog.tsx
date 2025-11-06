import clsx from 'clsx';

import { type Period } from '../Types';

import './Fog.css';

interface FogProps {
  period: Period;
}

export default function Fog({
  period = 'none'
}: FogProps ){
  const classes = clsx('fog', period);

  return (
    <div className={classes}>
      <div id="FogLayer1" className="fog-layer">
        <div className="fog-img1"></div>
        <div className="fog-img2"></div>
      </div>
      <div id="FogLayer2" className="fog-layer">
        <div className="fog-img1"></div>
        <div className="fog-img2"></div>
      </div>
      <div id="FogLayer3" className="fog-layer">
        <div className="fog-img1"></div>
        <div className="fog-img2"></div>
      </div>
    </div>
  );
}