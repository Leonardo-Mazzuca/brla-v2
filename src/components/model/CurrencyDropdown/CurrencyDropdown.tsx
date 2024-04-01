import React, { useState } from "react";
import CurrencyFlags from "./CurrencyFlags";
import { getCurrencyIMG } from "../../service/CurrencyService/getCurrencyIMG";

type CurrencyConfig = {
  coin: string;
  onCurrencyChange: (currency: string) => void;
};

const CurrencyDropdown: React.FC<CurrencyConfig> = ({ coin, onCurrencyChange }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(coin);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currencies = [

    { code: "BRL", name: "Brazilian Real", flag: getCurrencyIMG('BRL') },
    { code: "USDC", name: "USD Coin", flag: getCurrencyIMG('USDC') },
    { code: "USDT", name: "Tether (USDT)", flag: getCurrencyIMG('USDT') }
    
  ];


  const handleChange = (currency: string) => {
    
    setSelectedCurrency(currency);
    setDropdownOpen(false);
    onCurrencyChange(currency);


  };

  return (
    <div className="relative inline-block w-full text-left">
      <button
        className="flex justify-start rounded-md border-transparent shadow-sm px-4 py-4 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 w-full text-xl items-center"
        id="dropdown-button"
        aria-expanded={dropdownOpen ? "true" : "false"}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {currencies.map(({ code, flag }) => (
          selectedCurrency === code && <img key={code} className="w-5 h-5 mr-2 rounded-full" src={flag} alt={`${code} flag`} />
        ))}
        {selectedCurrency}
        <i className={`fa-solid fa-chevron-down ml-2 h-5 w-5 transition-transform transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'} `}></i>
      </button>
      {dropdownOpen && <CurrencyFlags currencies={currencies} handleChange={handleChange} />}
    </div>
  );
};

export default CurrencyDropdown;
