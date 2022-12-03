import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "./App/Select";
import { SelectType } from "../types/index";
// 393331ec7904623c72b86fa2ed48071d467ca127
// https://gist.githubusercontent.com/pimatco/64aec435e2a0abeeac8f30e24f918c11/raw/abaa40fd556e00cdddd7209836daf640740deaac/carbrands.json
// https://cars-base.ru/api/cars?full=1
const MainBlock: React.FC = () => {
  const [carsList, setCarsList] = useState<SelectType[]>([
    { value: "", text: "" },
  ]);
  const [markList, setMarkList] = useState<SelectType[]>([
    { value: "", text: "" },
  ]);
  const [yearList, setYearList] = useState<SelectType[]>([
    { value: "", text: "" },
  ]);
  const [mark, setMark] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [transmission, setTransmission] = useState<string>("");
  const [fuel, setFuel] = useState<string>("");
  const fetchManufacturers = async () => {
    let { data } = await axios.get("https://cars-base.ru/api/cars?full=1");
    let r = data.map((r: any) => {
      return {
        ...r,
        value: r.name,
        text: r.name,
      };
    });
    setCarsList(r);
  };
  const fetchMarks = async () => {
    let { data } = await axios.get("https://cars-base.ru/api/cars?full=1");
    let r = data.filter((m: any) => m.name === mark);
    let newR = r[0].models.map((markItem: any) => {
      return {
        value: markItem.name,
        text: markItem.name,
      };
    });
    setMarkList(newR);
  };
  const fetchYear = async () => {
    let { data } = await axios.get("https://cars-base.ru/api/cars?full=1");
    let r = data.filter((m: any) => m.name === mark);
    let newR = r[0].models.filter((markItem: any) => markItem.name === model);
    if (
      newR[0]["year-from"] === newR[0]["year-to"] ||
      newR[0]["year-to"] === null
    ) {
      setYearList([
        { value: newR[0]["year-from"], text: newR[0]["year-from"] },
      ]);
      return;
    }
    setYearList([
      { value: newR[0]["year-from"], text: newR[0]["year-from"] },
      {
        value: newR[0]["year-to"],
        text: newR[0]["year-to"],
      },
    ]);
  };
  useEffect(() => {
    fetchManufacturers();
  }, []);

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMark(e.target.value);
  };
  const onChangeSelectModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
  };
  const onChangeSelectYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };
  const onChangeSelectTransmission = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTransmission(e.target.value);
  };
  const onChangeSelectFuel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFuel(e.target.value);
  };
  useEffect(() => {
    fetchMarks();
  }, [mark]);

  useEffect(() => {
    fetchYear();
  }, [model]);
  return (
    <div className="App">
      <div className="container_main">
        <div className="header">ЖУЮ ЖИЖУ</div>
        <div className="main-block">
          <div className="left-inputs flex flex-col gap-4 items-center mt-4">
            <Select
              text="Марка"
              options={carsList}
              onChangeSelect={onChangeSelect}
            />
            <Select
              text="Модель"
              options={markList}
              onChangeSelect={onChangeSelectModel}
            />
            <Select
              text="Год"
              options={yearList}
              onChangeSelect={onChangeSelectYear}
            />
            <Select
              text="Коробка"
              options={[
                { value: "a", text: "Автоматическая" },
                { value: "m", text: "Механическая" },
              ]}
              onChangeSelect={onChangeSelectTransmission}
            />
            <Select
              text="Вид топлива"
              options={[
                { value: "gas", text: "Бензин" },
                { value: "deisel", text: "Дизельное топливо" },
              ]}
              onChangeSelect={onChangeSelectFuel}
            />
          </div>
          <div className="right-inputs mt-4 mb-4 flex flex-col items-center">
            <div className="white-input">
              <p>Как часто вы планируете использовать авто в неделю?</p>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 text-center w-[40px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>{" "}
              дня
            </div>
            <div className="select-input">
              <p>Где чаще будете пользоваться автомобилем?</p>
              <Select
                text="Марка"
                options={[{ value: "123", text: 123 }]}
                styles="w-full"
              />
            </div>
            <div className="flex align-center gap-10 mt-4 w-full justify-center">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Рассчитать страховку
              </button>
              <Link
                to={{
                  pathname: "/result",
                }}
                state={{
                  make: mark,
                  model: model,
                  fuel_type: fuel,
                  transmission: transmission,
                  year: year,
                }}
              >
                <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Показать
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBlock;
