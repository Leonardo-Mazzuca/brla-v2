
import React, { useState } from "react";
import CurrencyDropdown from "../CurrencyDropdown/CurrencyDropdown";
import TextModel from "../Text/Text";
import ToggleButton from "../Button/ToggleButton";
import { formatNumberToString } from "../../service/Formatters/FormatNumber/formatNumberToString";
import { useBalance } from "../../context/BalanceContext";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuote } from "../../context/QuoteContext";
import { useCurrency } from "../../context/CurrencyContext";


type ValueSelectConfig = {
    
    topIcon?: IconProp;
    topText?: string;
    toggleButtonPresent?: boolean;
    readOnlyInput?: boolean;
    inputValue: string;
    coin: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCurrencyChange: (currency: string) => void;
    dataType?: string;
    

};

const ValueSelect: React.FC<ValueSelectConfig> = ({

    topIcon,
    topText,
    toggleButtonPresent,
    readOnlyInput,
    inputValue,
    onChange,
    onCurrencyChange,
    coin,
    dataType,

}) => {
    
    const [isReadOnly, setInputReadOnly] = useState(false);
    const {state} = useBalance();
    const {state: currencyState, getCoin} = useCurrency();

    let availableValue: number;

    switch (coin) {
        case 'BRL':
            availableValue = state.brlBalance;
            break;
        case 'USDC':
            availableValue = state.usdcBalance;
            break;
        case 'USDT':
            availableValue = state.usdtBalance;
            break;
        default:
            availableValue = 0;

    }

    const formattedAvailableValue = formatNumberToString(availableValue, 'USD');

    const handleInputReadOnly = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputReadOnly(e.target.checked);
    };


    return (

        <div className="text-start mt-3" data-type={dataType}>

            <div className="flex justify-between w-full items-center mb-3 gap-3">
                <div className="flex items-center gap-2">
                    {topIcon && <FontAwesomeIcon icon={topIcon} />}
                    <TextModel addons="text-black" content={topText} />
                </div>
                {toggleButtonPresent && <ToggleButton onChange={handleInputReadOnly} />}

            </div>

            <div className="p-6 bg-gray-100 flex items-center justify-between rounded-xl flex-col md:flex-row">

                <div className="flex gap-2 w-full md:w-auto flex-col">
                    <CurrencyDropdown coin={coin} onCurrencyChange={onCurrencyChange} />

                    <TextModel addons="text-gray-400 mt-2" content={`Disponível ${formattedAvailableValue}`} />

                </div>

                <div className="flex justify-between md:flex-col items-center md:items-end">
                    
                    <input
                        value={inputValue}
                        onChange={onChange}
                        readOnly={readOnlyInput ? readOnlyInput : isReadOnly}
                        type="text"
                        className="bg-transparent px-0 pt-3 md:p-3 text-4xl font-bold border-transparent w-full md:w-2/4 text-start md:text-end"  
                    />

                    <div className="py-1 mt-2 px-5 rounded-lg bg-gray-200">
                        <TextModel content={"max"} />
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default ValueSelect;
