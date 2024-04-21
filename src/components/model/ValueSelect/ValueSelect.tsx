import React from "react";
import CurrencyDropdown from "../CurrencyDropdown/CurrencyDropdown";
import TextModel from "../Text/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputMoney from "../Input/InputMoney/InputMoney";
import { BG_GRAY_100, BG_GRAY_200, GAP_DEFAULT, ROUNDED_DEFAULT, TEXT_BLACK, TEXT_GRAY_400 } from "../../../contants/classnames/classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useBalance } from "../../../context/Balance/BalanceContext";
import { formatNumberToString } from "../../../functions/Formatters/FormatNumber/formatNumber";

type ValueSelectConfig = {
    
    topIcon?: IconProp;
    topText?: string;
    toggleButtonPresent?: boolean;
    inputValue: number;
    coin: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCurrencyChange: (currency: string) => void;
    dataType?: string;
    index: number;
    handleMaxButtonClick?: () => void;
 
}; 

const ValueSelect: React.FC<ValueSelectConfig> = ({
    topIcon,
    topText,
    inputValue,
    onChange,
    onCurrencyChange,
    coin,
    dataType,
    index,
    handleMaxButtonClick,


}) => {

    const { state } = useBalance();

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

    const formattedAvailableValue = formatNumberToString(availableValue, coin);


    return (

        <div className={`text-start mt-3`} data-type={dataType}>

            <div className={`flex justify-between w-full items-center mb-3 ${GAP_DEFAULT}`}>

                <div className={`flex items-center ${GAP_DEFAULT}`}>
                    {topIcon && <FontAwesomeIcon icon={topIcon} />}
                    <TextModel color={TEXT_BLACK} content={topText} />
                </div>

            </div>

            <div className={`p-3 ${BG_GRAY_100} flex items-center justify-between
             ${ROUNDED_DEFAULT} flex-col md:flex-row`}>
                <div className={`flex ${GAP_DEFAULT} w-full flex-col`}>

                    <CurrencyDropdown index={index} coin={coin} onCurrencyChange={onCurrencyChange} />
                    <TextModel color={TEXT_GRAY_400} addons="mt-2" content={`Disponível ${formattedAvailableValue}`} />

                </div>

                <div className={`flex jutify-between e-full md:flex-col items-center md:items-end`}>
                    <InputMoney value={inputValue} onChange={onChange} />
                    <button onClick={handleMaxButtonClick} className={`border-transparent py-1 mt-2 px-5 rounded-lg ${BG_GRAY_200}`}>max</button>
                </div>
                
            </div>
        </div>

    );
};

export default ValueSelect;
