import { CircularProgress, Slide, TextField } from "@mui/material";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";



function App() {
  const [cityName, setCityName] = useState("Hyderabad");
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

//fetching the api
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_API}&units=metric`).then((res) => {
      if (res.status === 200) {
        error && setError(false);
        return res.json();
      }
      else {
        throw new Error("Error");
      }
    }).then((data) => {
      setData(data);
    }).catch(() => {
      setError(true);
    }).finally(() => {
      setLoading(false);
    })
  }, [cityName, error])


  



  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCityName(e.target.value);
      setInputText("");
    }
  }

let day=new Date().toDateString();

  return (
  
  <div className="bg_img">
    {!loading ? (<>
    <h2 className="day">{day}</h2>
    <TextField variant="filled" label="Search Location" className="input" value={inputText} onChange={(e) => {
      setInputText(e.target.value)
    }
    } error={error} onKeyDown={handleSearch} />
      <h1 className="city">{data.name},{data.sys.country}</h1>
      <div className="group">
        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
        <h1>{data.weather[0].main}</h1>
      </div>
      <h1 className="temp">{data.main.temp.toFixed()} ℃</h1>
      <h2 className="desc">({data.weather[0].description})</h2>
      <Slide direction="right" timeout={800} in={!loading} >
        <div className="box_container">
         
          <div className="box">
            <p>Humidity </p>
            
            <h1>{data.main.humidity.toFixed()}%</h1>
          </div>
          <div className="box">
            <p>Wind </p>

            
            <h1>{data.wind.speed.toFixed()} km/h</h1>
          </div>
          <div className="box">
            <p>Feels Like</p>
            <h1>{data.main.feels_like.toFixed()} ℃</h1>
          </div>
          <div className="box">
            <p>Max Temp</p>
            <h1>{data.main.temp_max.toFixed()} ℃</h1>
          </div>
          <div className="box">
            <p>Pressure</p>
            <h1>{data.main.pressure} hPa</h1>
          </div>

        </div></Slide>
        </>) : <CircularProgress />}
  </div>);
}

export default App;
