import React, { useEffect, useRef, useState } from "react";
import search from "../assets/search.png";
import wind from "../assets/wind.png";
import humidity from "../assets/humidity.png";
import axios from "axios";

const Weather = () => {

    const [searchinput, setSearchInput] = useState("nagpur");
    const [fetchdata, setfetchData] = useState(null);
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
        getData();
    }, [])

    const getData = () => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchinput}&appid=c46be70f6b1cf2b7473094269bee0cc1&units=metric`
        axios.get(apiUrl)
            .then(res => {
                setfetchData(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const inputEvent = (event) => {
        setSearchInput(event.target.value);
    }

    return (
        <>
            <h1 className="text-center font-bold text-3xl py-9">Welcome to My Weather App</h1>
            <div className="flex justify-center item-center">
                <div className="flex items-center flex-col border border-rose-500 w-[30rem] rounded-md h-[100%] p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                    <div className="flex justify-center item-center gap-4">
                        <input input="text" placeholder="search....." className="border-[1px] py-2 pl-5 rounded-full md:w-[310px] w-[240px] bg-purple-400 outline-0 text-[20px] placeholder:text-gray-500" ref={inputRef} onChange={inputEvent} />
                        <img src={search} alt="search" className="bg-purple-400 border-[1px] text-black p-4 rounded-full cursor-pointer w-12 " onClick={getData} />
                    </div>
                    {fetchdata ? (
                        <div className="flex items-center flex-col">
                            <p className="mt-6 text-[25px] text-[#6e046e]">City : <span className="text-rose-700">{fetchdata.name}, {fetchdata.sys.country}</span></p>
                            <p className="text-[40px] mt-5 text-slate-800">{fetchdata.main.temp}<span>°C</span></p>

                            <div className="flex justify-between md:gap-24 gap-10 w-[100%] mt-10">
                                <div className="flex items-start text-[20px] gap-3">
                                    <img src={humidity} alt="humidityicon" className="mt-2" />
                                    <div>
                                        <p>{fetchdata.main.humidity} %</p>
                                        <span className="text-[18px] text-rose-700">Humidity</span>
                                    </div>
                                </div>
                                <div className="flex items-start text-[20px] gap-3">
                                    <img src={wind} alt="windicon" className="mt-2" />
                                    <div>
                                        <p>{fetchdata.wind.speed} km/h</p>
                                        <span className="text-[18px] text-rose-700">Wind Speed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : "Loading...."}

                </div>

            </div>
        </>
    );
}

export default Weather;