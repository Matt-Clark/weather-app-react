import type { Unit } from '../Types';

import './UnitSwitch.css';

interface UnitSwitchProps {
  units: Unit;
  handleClick: () => void;
}

export default function UnitSwitch({
  units = 'imperial',
  handleClick = () => {}
}: UnitSwitchProps){
  return (
    <button 
      className={`unit-switch ${units}`} 
      type="button" 
      onClick={handleClick}
    >
      <span>F</span>
      <span>C</span>
    </button>
  );
}