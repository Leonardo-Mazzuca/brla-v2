import React, { useEffect, useState, useRef } from "react";
import CurrencyFlags from "./CurrencyFlags";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getCurrencyIMG } from "../../../service/CurrencyService/getCurrencyIMG";


type CurrencyConfig = {
  coin: string;
  onCurrencyChange: (currency: string) => void;
  index: number;
};

const CurrencyDropdown: React.FC<CurrencyConfig> = ({ coin, onCurrencyChange, index }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(coin);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currencies = [
    { code: "BRL", name: "Brazilian Real", flag: getCurrencyIMG('BRL') },
    { code: "USDC", name: "USD Coin", flag: getCurrencyIMG('USDC') },
    { code: "USDT", name: "Tether (USDT)", flag: getCurrencyIMG('USDT') }
  ];

  const handleChange = (currency: string) => {
    setDropdownOpen(false);
    setSelectedCurrency(currency);
    onCurrencyChange(currency);
  };

  const handleClick = () => {

    setDropdownOpen(!dropdownOpen);

  };

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} className={`relative w-full inline-block text-left`} data-index={index} data-dropdown={dropdownOpen ? 'open' : 'closed'}>

      <button
        className="flex w-auto justify-start rounded-md border-transparent shadow-sm px-4 py-4 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 text-lg items-center"
        id="dropdown-button"
        aria-expanded={dropdownOpen ? "true" : "false"}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {currencies.map(({ code, flag }) => (
          selectedCurrency === code && <img key={code} className="w-5 h-5 mr-2 rounded-full" src={flag} alt={`${code} flag`} />
        ))}
        {selectedCurrency}
        <FontAwesomeIcon icon={faChevronDown} className={`ml-2 h-5 w-5 transition-transform transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {dropdownOpen && <CurrencyFlags currencies={currencies} handleChange={handleChange} />}

    </div>
    
  );
};

export default CurrencyDropdown;
