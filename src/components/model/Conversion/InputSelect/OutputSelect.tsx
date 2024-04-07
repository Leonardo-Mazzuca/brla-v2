import { useEffect, useState } from "react";
import { useBalance } from "../../../context/BalanceContext";
import { CurrencyActions, useCurrency } from "../../../context/CurrencyContext";
import { useQuote } from "../../../context/QuoteContext";
import { ConvertOperation } from "../../../types/Operations/ConvertOperation";
import ValueSelect from "../../ValueSelect/ValueSelect";
import { getAvaliableBalance } from "../../../service/BalanceService/getAvaliableBalance";




const OutputSelect:React.FC <ConvertOperation>
= ({state, coin, value, dispatch, setInputValue, setOutputValue, isToggleButton, topIcon, topText}) => {

    const {conversor} = useCurrency();
    const {state:quoteState, createConversionTable} = useQuote();
    const{state:balanceState} = useBalance();
    const [availableValue, setAvaliableValue] = useState(0);

    useEffect(()=> {

        setAvaliableValue(getAvaliableBalance(coin,balanceState));

    },[coin,availableValue]);


    const handleMaxButtonClick = () => {

        const maxValue = availableValue;

        setOutputValue(maxValue);

        const converted = conversor(maxValue, state.receiveCurrency, state.sendCurrency, 
        createConversionTable(quoteState))

        setInputValue(converted);

        console.log('Estou no Output');
        console.log('Output value: ', maxValue);
        console.log('Converted: ', converted);

    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        
        let outputValue = parseFloat(e.target.value);

        setOutputValue(outputValue);

        const converted = conversor(
              outputValue,
              state.receiveCurrency,
              state.sendCurrency,
              createConversionTable(quoteState)
          )
        ;

        setInputValue(converted);

        dispatch({
            type: CurrencyActions.setSendValue,
            payload: { sendValue: converted }
        });

        dispatch({
            type: CurrencyActions.setReceiveValue,
            payload: { receiveValue: outputValue }
        });
           
        dispatch({
          type: CurrencyActions.setFixOutput,
          payload: { fixOutput: true },
        });

    };

    const handleCurrency = (currency: string) => {

        dispatch({
            type: CurrencyActions.setReceiveCurrency,
            payload: { receiveCurrency: currency }
        });

    };

 
    

    return (

        <ValueSelect
        index={2}
        coin={coin}
        inputValue={value}
        onChange={handleChange}
        onCurrencyChange={handleCurrency}
        topText={topText}
        topIcon={topIcon}
        toggleButtonPresent={isToggleButton}
        handleMaxButtonClick={handleMaxButtonClick}
    
    
        />
  

    );

}

export default OutputSelect;