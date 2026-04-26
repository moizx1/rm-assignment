/* eslint-disable react/prop-types */
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
const OutlinedInput = ({
  type,
  id,
  placeholder,
  value,
  onChange,
  required,
  disabled,
  options,
}) => {
  const { isDarkMode } = useTheme();
  return (
    <div className="relative h-12 w-full min-w-[200px]">
      {options ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="peer h-full w-full rounded-[7px] border border-[#313131] border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all focus:border-2 focus:border-[#F4DBFF] focus:border-t-transparent focus:outline-0"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#313131]" >
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`peer h-full w-full rounded-[7px] border border-[#313131] border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal ${isDarkMode? 'text-blue-gray-700' : 'text-black'} outline-none transition-all placeholder-shown:border ${isDarkMode ? 'placeholder-shown:border-[#313131] placeholder-shown:border-t-[#313131]' : 'placeholder-shown:border-gray-300 placeholder-shown:border-t-gray-300'} focus:border-2 ${isDarkMode ? 'focus:border-[#F4DBFF]' : 'focus:border-purple-800 focus:border-opacity-50'} focus:border-t-transparent focus:outline-0 placeholder:opacity-0 focus:placeholder:opacity-100`}
        />
      )}
      <label className={`before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-[#313131] before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-[#313131] after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.275] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight ${isDarkMode ? 'peer-focus:text-[#F4DBFF]' : 'peer-focus:text-purple-800 peer-focus:text-opacity-80'} peer-focus:before:border-t-2 peer-focus:before:border-l-2 ${isDarkMode ? 'peer-focus:before:!border-[#F4DBFF]' : 'peer-focus:before:!border-purple-800 peer-focus:before:!border-opacity-50'} peer-focus:after:border-t-2 peer-focus:after:border-r-2 ${isDarkMode ? 'peer-focus:after:!border-[#F4DBFF]' : 'peer-focus:after:!border-purple-800 peer-focus:after:!border-opacity-50'} peer-disabled:border-[transparent] peer-disabled:peer-placeholder-shown:text-blue-gray-500`}>
        {placeholder}
      </label>
    </div>
  );
};



export default OutlinedInput;
