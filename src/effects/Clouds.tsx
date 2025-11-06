import './Clouds.css';

export default function Clouds(){
  return (
    <div className="clouds">
      <div id="Cloud1"></div>
      <div id="Cloud2"></div>
      <div id="Cloud3"></div>
      <div id="Cloud4"></div>

      <svg width="0" height="0"> 
        <filter id="CloudFilter">
          <feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="10" />
          <feDisplacementMap in="SourceGraphic" scale="180" />
        </filter>
      </svg>
    </div>
  );
}