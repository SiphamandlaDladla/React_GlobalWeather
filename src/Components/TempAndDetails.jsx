import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const TempAndDetails = ({
    weather: {
        details,
        icon,
        temp,
        temp_min,
        temp_max,
        sunrise,
        sunset,
        speed,
        humidity,
        feels_like,
    },
      units,
}) => {

const verticalDetails = [
    {
        id: 1,
        Icon: FaThermometerEmpty,
        title: "Real Feel",
        value: `${feels_like.toFixed()}°`,
    },
    {
        id: 2,
        Icon: BiSolidDropletHalf,
        title: "Humidity",
        value: `${humidity.toFixed()}°`,
    },
    {
        id: 3,
        Icon: FiWind,
        title: "Wind",
        value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}`,
    },
];

const HorizontalDetails = [
    {
        id: 1,
        Icon: GiSunrise,
        title: "Sunrise",
        value: sunrise, //why this value is not assigned as the values on horizontal details
    },
    {
        id: 2,
        Icon: GiSunset,
        title: "Sunset",
        value: sunset,  //why this value is not assigned as the values on horizontal details
    },
    {
        id: 3,
        Icon: MdKeyboardArrowUp,
        title: "High",
        value: `${temp_max.toFixed()}°`,
    },
    {
        id: 4,
        Icon: MdKeyboardArrowDown,
        title: "Low",
        value: `${temp_min.toFixed()}°`,
    },
];

  return (
    <div>
        <div className="flex items-center justify-center py-6 text-cyan-300">
            <p>{details}</p>
        </div>
        <div className="flex flex-row items-center justify-between py-3">
            <img src= {icon} alt="weather icon" className="w-20"/>
            <p className="text-5xl">{`${temp.toFixed()}°`}</p>

            <div className="flex flex-col space-y-3 items-start">
                {
                    verticalDetails.map(({id,Icon,title,value}) => (
                        <div key={id} className="flex items-center justify-center text-sm">
                            <Icon size={18} className="mr-1"/>
                            {`${title}: `} <span className="font-medium ml-1">{value}</span>
                        </div>
                    ))
                }
                
            </div>
        </div>
        <div className="flex flex-row items-center justify-center space-x-10 text-sm py-3">
            {
                HorizontalDetails.map(({id,Icon,title,value}) => (
                    <div key={id} className="flex items-center just-center text-sm">
                        <Icon size={18}/>
                        <p>
                        {`${title}: `}
                        <span className="font-medium ml-1">{value}</span>
                        </p>
                        </div>
                ))
            }
        </div>
    </div>
  );
};

export default TempAndDetails;