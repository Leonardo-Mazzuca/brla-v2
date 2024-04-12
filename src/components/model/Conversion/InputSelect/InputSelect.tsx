
import { CurrencyActions, useCurrency } from "../../../context/CurrencyContext";
import { useQuote } from "../../../context/QuoteContext";
import { ConvertOperation } from "../../../types/Operations/ConvertOperation";
import ValueSelect from "../../ValueSelect/ValueSelect";
import { useBalance } from "../../../context/BalanceContext";
import { useEffect, useState } from "react";
import { getAvaliableBalance } from "../../../service/BalanceService/getAvaliableBalance";


const InputSelect = ({ coin, state, value, dispatch,
     setInputValue, setOutputValue, topIcon, topText }: ConvertOperation) => {
   
    const { conversor } = useCurrency();
    const { state: quoteState, createConversionTable } = useQuote();
    const{state:balanceState} = useBalance();
    const [availableValue, setAvaliableValue] = useState(0);


    useEffect(()=> {

        setAvaliableValue(getAvaliableBalance(coin,balanceState));


    },[coin, balanceState]);

    const handleMaxButtonClick = () => {

        const maxValue = availableValue;
        

        const converted = conversor(availableValue, state.sendCurrency, state.receiveCurrency, createConversionTable(quoteState))

        
        setInputValue(maxValue);
        setOutputValue(converted);       

        dispatch({
            type: CurrencyActions.setSendValue,
            payload: { sendValue: maxValue },
        });
    
        dispatch({
            type: CurrencyActions.setReceiveValue,
            payload: { receiveValue: converted },
        });
        
    }

    const handleCurrency = (currency: string) => {

        dispatch({
            type: CurrencyActions.setSendCurrency,
            payload: { sendCurrency: currency }
        });

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let inputValue = parseFloat(e.target.value);

        setInputValue(inputValue);
    
        const converted = conversor(
                inputValue,
                  state.sendCurrency,
                  state.receiveCurrency,
                  createConversionTable(quoteState)
              );
        
        setOutputValue(converted);
    
        dispatch({
            type: CurrencyActions.setSendValue,
            payload: { sendValue: inputValue },
        });
    
        dispatch({
            type: CurrencyActions.setReceiveValue,
            payload: { receiveValue: converted },
        });
    
        dispatch({
            type: CurrencyActions.setFixOutput,
            payload: { fixOutput: false },
        });

        
    };


    return (

        <ValueSelect
            index={1}
            coin={coin}
            inputValue={value}
            onChange={handleChange}
            onCurrencyChange={handleCurrency}
            topText={topText}
            topIcon={topIcon}
            handleMaxButtonClick={handleMaxButtonClick}
        />

    );
}

export default InputSelect;
