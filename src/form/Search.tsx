import './Search.css';

interface SearchProps {
  cityName: string;
  handleChange: (value: string) => void;
  handleEnter: () => void;
}

export default function Search({
  cityName = '',
  handleChange = () => {},
  handleEnter = () => {}
}: SearchProps){
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if( /^[a-zA-Z]+(?:[\s-'][a-zA-Z]+)*$/.test(event.target.value ) ){
      handleChange(event.target.value);
    }
  }

  function onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if(event.code === 'Enter'){
      handleEnter();
    }
  }

  return (
    <input 
      className="city-search"
      type="text"
      placeholder="City Name"
      value={cityName}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
  );
}