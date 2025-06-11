"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || placeholder);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setSelectedValue(value || placeholder);
  }, [value, placeholder]);

  const handleOptionSelect = (option) => {
    if (disabled || option.disabled) return;
    setSelectedValue(option.title || option);
    onChange(option.value || option);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={`flex items-center justify-between w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
          isOpen ? "ring-2 ring-primary-500" : ""
        } ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}`}
        disabled={disabled}
      >
        <span className="text-gray-700 text-sm">
          {selectedValue || placeholder}
        </span>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <ul className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-full max-h-60 overflow-auto">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`px-4 py-2 text-sm cursor-pointer ${
                option.disabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-primary-50 hover:text-primary-600"
              } ${
                value === (option.value || option)
                  ? "bg-primary-50 text-primary-600"
                  : ""
              }`}
            >
              {option.title || option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}