
import React, { useState } from "react";
import CurrencyDropdown from "../CurrencyDropdown/CurrencyDropdown";
import TextModel from "../Text/Text";
import ToggleButton from "../Button/ToggleButton";
import { formatNumberToString } from "../../service/Formatters/FormatNumber/formatNumber";
import { useBalance } from "../../context/BalanceContext";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputMoney from "../Input/InputMoney";



type ValueSelectConfig = {
    
    topIcon?: IconProp;
    topText?: string;
    toggleButtonPresent?: boolean;
    readOnlyInput?: boolean;
    inputValue: number;
    coin: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCurrencyChange: (currency: string) => void;
    dataType?: string;
    handleMaxButtonClick?: () => void
    

};

const ValueSelect: React.FC<ValueSelectConfig> = ({

    topIcon,
    topText,
    toggleButtonPresent,
    inputValue,
    onChange,
    onCurrencyChange,
    coin,
    dataType,
    handleMaxButtonClick

}) => {
    
    const [isReadOnly, setInputReadOnly] = useState(false);
    const {state} = useBalance();

    let availableValue: number;

    switch (coin) {
        case 'BRLA':
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

    const formattedAvailableValue = formatNumberToString(availableValue, coin);

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
                    
                    {/* <input

                      
                        readOnly={readOnlyInput ? readOnlyInput : isReadOnly}
                        type="text"
                        className="bg-transparent px-0 pt-3 md:p-3 text-4xl font-bold border-transparent w-full md:w-2/4 text-start md:text-end"  

                    /> */}

                    <InputMoney 
                      value={inputValue}
                      onChange={onChange}
                    />

                    <button onClick={handleMaxButtonClick} 
                    className="border-transparent py-1 mt-2 px-5 rounded-lg bg-gray-200">
                        max
                    </button>

                </div>
                
            </div>
        </div>
    );
};

export default ValueSelect;
