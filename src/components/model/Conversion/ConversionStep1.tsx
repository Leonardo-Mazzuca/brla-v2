import React, { useEffect, useState } from "react";
import { useCurrency } from "../../context/CurrencyContext";
import ContainerService from "../Container/ContainerService";
import ConversionContainer from "../Container/ConversionContainer";
import IconBall from "../IconBall/IconBall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useBalance } from "../../context/BalanceContext";

import InputSelect from "./InputSelect/InputSelect";
import OutputSelect from "./InputSelect/OutputSelect";
import { block, pointsAll, pointsNone } from "../../types/Button/buttonVariables";
import TextModel from "../Text/Text";
import { useQuote } from "../../context/QuoteContext";
import { is0Value, isBalanceLessThanValue, isTheSameCoin } from "../../service/OperationValidities/operationValidities";


const ConversionStep1: React.FC = () => {

    const {state, dispatch, conversor } = useCurrency();
    const [inputValue, setInputValue] = useState("00,00");
    const [outputValue, setOutputValue] = useState("00,00");
    const [isValuable, setIsValuable] = useState(false);
    const [buttonClassname, setButtonClassname] = useState(block);
    const [errorMessage, setErrorMessage] = useState('');
    const {state:balanceState, getCoinToBalance} = useBalance();
    const {state:quoteState, createConversionTable} = useQuote();


    const converted = conversor(inputValue, state.sendCurrency, state.receiveCurrency,createConversionTable(quoteState));

    useEffect(() => {

      if(quoteState.brl && quoteState.usdc && quoteState.usdt) {

        setOutputValue(converted);

      }

  }, [state.sendCurrency, state.receiveCurrency]);

    useEffect(() => {

        const coinBalance = getCoinToBalance(state.sendCurrency, balanceState);

        const withoutValue = is0Value(inputValue, outputValue);
        const sameCoin =  isTheSameCoin(state.sendCurrency, state.receiveCurrency);
        const withoutBalance = isBalanceLessThanValue(parseFloat(inputValue),coinBalance)

        if (withoutValue || sameCoin || withoutBalance ) {

            setIsValuable(false);
            setErrorMessage(withoutValue || sameCoin || withoutBalance)
            
        } else {

            setIsValuable(true);
            setErrorMessage('');

        }

    }, [inputValue, outputValue, state.sendCurrency, state.receiveCurrency]);

    useEffect(() => {

        if(isValuable) {
            setButtonClassname(pointsAll)
        } else {
            setButtonClassname(pointsNone)
        }

    }, [isValuable, inputValue, balanceState, state.sendCurrency, getCoinToBalance]);


    return (

        <ContainerService path="/home" linkText="Dashboard">

            <ConversionContainer 
                activeIndex={0}
                location="/convert/2" 
                buttonComponent={<span>Próximo <FontAwesomeIcon icon={faArrowRight} /></span>}
                buttonControl={buttonClassname}
            >

                <InputSelect

                    coin = {state.sendCurrency}
                    value= {inputValue}
                    state={state}
                    dispatch={dispatch}
                    setInputValue={setInputValue}
                    setOutputValue={setOutputValue}

                />

                <IconBall absolute icon={faArrowDown} />

                <OutputSelect
                    coin = {state.receiveCurrency}
                    value= {outputValue}
                    state={state}
                    dispatch={dispatch}
                    setInputValue={setInputValue}
                    setOutputValue={setOutputValue}
            
                />

                <div>   
                    {errorMessage && 
                    <TextModel addons="text-gray-500 text-center" content={errorMessage} />}
                </div>
              

            

            </ConversionContainer>
            
        </ContainerService>
    );
};

export default ConversionStep1;
