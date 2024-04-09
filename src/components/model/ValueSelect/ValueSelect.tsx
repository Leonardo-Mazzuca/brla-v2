import React, { useState } from "react";
import CurrencyDropdown from "../CurrencyDropdown/CurrencyDropdown";
import TextModel from "../Text/Text";
import { formatNumberToString } from "../../service/Formatters/FormatNumber/formatNumber";
import { useBalance } from "../../context/BalanceContext";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputMoney from "../Input/InputMoney";
import { BG_GRAY_100, BG_GRAY_200, BORDER_NONE, FLEX, FLEX_COL, FLEX_ROW, GAP_DEFAULT, ITEMS_CENTER, ITEMS_END, JUSTIFY_BETWEEN, ROUNDED_DEFAULT, TEXT_BLACK, TEXT_GRAY_400, TEXT_START, WIDTH_AUTO, WIDTH_FULL } from "../../contants/classnames/classnames";

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


    return (

        <div className={`${TEXT_START}  mt-3`} data-type={dataType}>

            <div className={`${FLEX} ${JUSTIFY_BETWEEN} w-full ${ITEMS_CENTER} mb-3 ${GAP_DEFAULT}`}>

                <div className={`${FLEX} ${ITEMS_CENTER} ${GAP_DEFAULT}`}>
                    {topIcon && <FontAwesomeIcon icon={topIcon} />}
                    <TextModel color={TEXT_BLACK} content={topText} />
                </div>

            </div>

            <div className={`p-3 ${BG_GRAY_100} ${FLEX} ${ITEMS_CENTER} ${JUSTIFY_BETWEEN} ${ROUNDED_DEFAULT} ${FLEX_COL} md:flex-row`}>
                <div className={`${FLEX} ${GAP_DEFAULT} ${WIDTH_FULL} ${FLEX_COL}`}>

                    <CurrencyDropdown index={index} coin={coin} onCurrencyChange={onCurrencyChange} />
                    <TextModel color={TEXT_GRAY_400} addons="mt-2" content={`Disponível ${formattedAvailableValue}`} />

                </div>

                <div className={`${FLEX} ${JUSTIFY_BETWEEN} ${WIDTH_FULL} md:flex-col ${ITEMS_CENTER} md:items-end`}>
                    <InputMoney value={inputValue} onChange={onChange} />
                    <button onClick={handleMaxButtonClick} className={`${BORDER_NONE} py-1 mt-2 px-5 rounded-lg ${BG_GRAY_200}`}>max</button>
                </div>
                
            </div>
        </div>

    );
};

export default ValueSelect;
