import { useState, useEffect } from 'react';
import axios from 'axios';

const weatherClient = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

const openMeteoApiBase = 'https://api.open-meteo.com/v1/forecast';

const locationList = [{ enName: 'tokyo', jpName: '東京', lat: 35.689, lon: 139.692 }];

const App = () => {
  const location = locationList[0];

  const [weatherInfo, setWeatherInfo] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await weatherClient.get(
          `${openMeteoApiBase}?timezone=Asia/Tokyo&latitude=${location.lat}&longitude=${location.lon}&hourly=weather_code`
        );
        const weatherData = res.data;
        setWeatherInfo(weatherData);
      } catch (error) {
        alert(error.message);
      }
    })();
  }, []);

  return <div style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(weatherInfo, null, 2)}</div>
};

export default App;
