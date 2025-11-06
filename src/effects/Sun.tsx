import './Sun.css';

export default function Sun(){
  return (<>
    <div className="sun-box">
      <div className="long-rays">
        <div className="ray"></div>
        <div className="ray"></div>
        <div className="ray"></div>
      </div>
      <div className="short-rays">
        <div className="ray"></div>
        <div className="ray"></div>
        <div className="ray"></div>
      </div>
      <div className="sun"></div>
    </div>
    </>
  );
}