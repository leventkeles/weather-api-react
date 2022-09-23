import React, {useState} from 'react'
import axios from 'axios'
function App() {

  const [data,setData] = useState({})
  const [location,setLocation] = useState('Ankara')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=254d23767b0a1df49f75908a65e255f0&units=metric`
  
  const searchLocation = (event) => {

    if (event.key === 'Enter') {

      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })

      setLocation('')

    }
  }

  React.useEffect(()=>{
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
      setLocation('')
    })

  },[location])
  
  return (

    <div className="app">
      <div className="container">
        <div className="search">
          <input type="text" value={location} onChange={event => setLocation(event.target.value)} placeholder="Şehir Gir" onKeyPress={searchLocation}/>
        </div>
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
 
          </div>
          <div className="description">
          {data.weather ? <p>{data.weather?.[0].main}</p>  : null }
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
          {data.main ? <p className='bold'>{data.main.feels_like}°C</p> : null}
           Hissedilen
          </div>
          <div className="humidity">
          {data.main ? <p className='bold'>%{data.main.humidity}</p> : null}
            Nem
          </div>
          <div className="wind">
          {data.wind ? <p className='bold'>{data.wind.speed}MPH</p> : null}
            Rüzgar
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
