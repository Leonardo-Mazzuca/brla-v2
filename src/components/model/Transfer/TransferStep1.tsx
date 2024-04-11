import React, { useEffect, useState } from "react";
import ContainerService from "../Container/ContainerService";
import TransfersContainer from "../Container/TransfersContainer";
import { useCurrency } from "../../context/CurrencyContext";
import { useQuote } from "../../context/QuoteContext";
import {
  block,
} from "../../types/Button/buttonVariables";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useBalance } from "../../context/BalanceContext";
import TextModel from "../Text/Text";
import InputSelect from "../Conversion/InputSelect/InputSelect";
import OutputSelect from "../Conversion/InputSelect/OutputSelect";
import { controllValueChange, doValidations, verifyIfIsValuable } from "../../service/TransfersService/transfersStep1Service";

const TransferStep1: React.FC = () => {
  const { state, dispatch, conversor } = useCurrency();
  const { state: balanceState, getCoinToBalance } = useBalance();
  const { state: quoteState, createConversionTable } = useQuote();
  const [inputValue, setInputValue] = useState(0);
  const [outputValue, setOutputValue] = useState(0);
  const [buttonClassname, setButtonClassname] = useState(block);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValuable, setIsValuable] = useState(false);
  const [isVisible, setVisibility] = useState("hidden");


  const converted = conversor(
    inputValue,
    state.sendCurrency,
    state.receiveCurrency,
    createConversionTable(quoteState)
  );

  useEffect(() => {

      controllValueChange(converted, setOutputValue, dispatch, inputValue, setVisibility, quoteState)

  }, [state.sendCurrency, state.receiveCurrency, inputValue, outputValue, isVisible]);

  useEffect(() => {

    const coinBalance = getCoinToBalance(state.sendCurrency, balanceState);

    doValidations(coinBalance, inputValue, outputValue, setIsValuable, setErrorMessage);


  }, [inputValue, outputValue, state.sendCurrency, state.receiveCurrency]);

  useEffect(() => {

    verifyIfIsValuable(isValuable, setButtonClassname);

  }, [

    isValuable,
    inputValue,
    balanceState,
    state.sendCurrency,
    getCoinToBalance,

  ]);

  

  return (

    <ContainerService path="/home" linkText="Dashboard">

      <TransfersContainer
      
        buttonControl={buttonClassname}
        activeIndex={0}
        location={'/transfer/2/'}

      >

        <InputSelect

          coin={state.sendCurrency}
          value={inputValue}
          setInputValue={setInputValue}
          setOutputValue={setOutputValue}
          topText="Você envia"
          topIcon={faArrowUp}
          dispatch={dispatch}
          state={state}

        />

        <div className={isVisible}>

          <OutputSelect

            coin={state.receiveCurrency}
            value={outputValue}
            setInputValue={setInputValue}
            setOutputValue={setOutputValue}
            topText="Beneficiário Recebe"
            topIcon={faArrowDown}
            isToggleButton={true}
            state={state}
            dispatch={dispatch}

          />

        </div>

        <div>
          {errorMessage && (
            <TextModel
              addons="text-gray-500 text-center"
              content={errorMessage}
            />
          )}
        </div>

      </TransfersContainer>

    </ContainerService>
  );
};

export default TransferStep1;
