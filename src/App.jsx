import { FaReact } from "react-icons/fa";
import TopButtons from "./Components/TopButtons";
import Inputs from "./Components/Inputs";
import TimeAndLocation from "./Components/TimeAndLocation";
import TempAndDetails from "./Components/TempAndDetails";
import Forecast from "./Components/Forecast";
import getFormattedWeatherData from "./assets/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  //create useStates
  const [query, setQuery] = useState({q: 'Johannesburg'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)


  const getWeather = async () => {
    const message = query.q ? query.q : "Current Location"
    toast.info(`Fetching weather data for ${message}`)

    await getFormattedWeatherData({...query, units}).then((data) => {
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather(data);
    });
    //console.log(data);
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  //getWeather();

  //check this update later
  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 20:60;
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700"; 
  };

  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} setUnits={setUnits}/>
      {
        weather && (
          <>
              <TimeAndLocation weather={weather}/>
              <TempAndDetails weather={weather} units={setUnits}/>
              <Forecast title="3 hour step forecast" data={weather.hourly}/>
              <Forecast title="daily forecast" data={weather.daily}/>
          </>
        )}
        <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored"/>

    </div>
  )

}
export default App