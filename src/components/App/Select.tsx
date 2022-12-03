import React from "react";
import { SelectType } from "../../types";

const inputClasses = `form-select appearance-none block w-[75%] cte px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;

interface SelectProps {
  text: string;
  options: SelectType[];
  styles?: string;
  onChangeSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MainBlock: React.FC<SelectProps> = ({
  text,
  options,
  styles,
  onChangeSelect,
}) => {
  return (
    <select
      className={inputClasses + " " + styles}
      defaultValue={text}
      onChange={onChangeSelect}
    >
      <option disabled value={text}>
        {text}
      </option>
      {options.map((opt) => (
        <option key={opt.text} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </select>
  );
};

export default MainBlock;
