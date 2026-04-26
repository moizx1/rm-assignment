/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import OutlinedInput from "../../components/TextField/OutlinedInput";
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from "../../hooks/useTheme";

const CustomForm = ({ inputs, onSubmit, message, toggleLink }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [formData, setFormData] = useState(
    inputs.reduce((acc, input) => ({ ...acc, [input.id]: "" }), {})
  );

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className={`relative flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-800 text-white rounded-full"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <div className={`w-1/3 min-w-[300px] px-8 py-6 space-y-8 border ${isDarkMode ? 'border-[#3d3d3d] bg-[#1b1b1b]' : 'border-gray-300 bg-white'} rounded-lg shadow-md bg-opacity-50`}>
        <h2 className={`text-3xl font-bold text-center ${isDarkMode ? 'text-[#F4EBEF]' : 'text-black'}`}>FinNest</h2>
        {message && <p className="text-red-500 text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-8">
          {inputs.map((input) => (
            <OutlinedInput
              key={input.id}
              id={input.id}
              type={input.type}
              placeholder={input.placeholder}
              value={formData[input.id]}
              onChange={handleChange}
              required={input.required}
              className={`${isDarkMode ? 'text-white' : 'text-black'}`}
            />
          ))}
          <button
            type="submit"
            className={`text-lg w-full py-3 mt-2 rounded-md shadow-md ${isDarkMode ? 'bg-[#342155] text-white' : 'bg-[#342155] bg-opacity-85 text-white'} font-normal hover:bg-opacity-50`}
          >
            {toggleLink.text}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{toggleLink.prompt}</span>{" "}
            <Link to={toggleLink.link} className={`${isDarkMode ? 'text-[#F4DBFF]' : 'text-[#342155]'} hover:underline`}>
              {toggleLink.linkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomForm;
