import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FetchCarType } from "../types";
const Result: React.FC = () => {
  const loc = useLocation();
  const [carInfo, setCarInfo] = useState<FetchCarType>();
  const [gasPrice, setGasPrice] = useState("Загрузка...");
  useEffect(() => {
    const tempCar = {
      make: loc.state.make,
      model: loc.state.model,
      fuel_type: loc.state.fuel_type,
      transmission: loc.state.transmission,
      year: loc.state.year,
    };
    setCarInfo(tempCar);
  }, []);

  async function fetchCarData(car?: FetchCarType) {
    if (car) {
      const { data } = await axios.get(
        `https://api.api-ninjas.com/v1/cars?limit=1&make=${car?.make}&model=${car?.model}&fuel_type=${car?.fuel_type}&transmission=${car?.transmission}&year=${car?.year}`,
        {
          headers: { "X-Api-Key": "Pbn6y5IhYnqm5+tcznnxYw==eCTc0c2DRT9KbhTy" },
        }
      );
      if (data) {
        let f = (((100 * 3.785) / (data[0].city_mpg * 1.609)) * 55).toFixed();
        setGasPrice(f);
      }
    }
    // const res = axios.get(
    //   `https://api.api-ninjas.com/v1/cars?limit=200&make=renault`,
    //   {
    //     headers: { "X-Api-Key": "Pbn6y5IhYnqm5+tcznnxYw==eCTc0c2DRT9KbhTy" },
    //   }
    // );
  }

  useEffect(() => {
    fetchCarData(carInfo);
  }, [carInfo]);
  return (
    <div className="App">
      <div className="container_main">
        <div className="header">ЖУЮ ЖИЖУ - РЕЗУЛЬТАТ</div>
        <div className="main-block">
          <div className="result-header">
            <h2>
              {loc.state.make} {loc.state.model}
            </h2>
            <img
              src={`https://www.auto-data.net/img/logos/${loc.state.make}.png`}
              alt=""
            />
          </div>
          <div className="result-info">
            <p className="result-info-gas">
              Средняя цена на бензин — <span>{gasPrice} ₽</span>
            </p>
            <p className="result-info-repair">
              Средняя цена СТО — <span>1488 ₽</span>
            </p>
            <p className="result-info-save">
              Цена страховки — <span>31 286 ₽</span>
            </p>
          </div>
          <Link to="/">
            <button
              type="button"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Вернуться назад
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;
