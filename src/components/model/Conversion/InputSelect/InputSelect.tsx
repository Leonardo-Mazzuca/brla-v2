import { CurrencyActions, useCurrency } from "../../../context/CurrencyContext";
import { useQuote } from "../../../context/QuoteContext";
import { formatNumber } from "../../../service/Formatters/FormatNumber/formatNumber";
import { ConvertOperation } from "../../../types/Operations/ConvertOperation";
import ValueSelect from "../../ValueSelect/ValueSelect";



const InputSelect = ({coin,state, value, dispatch, setInputValue, setOutputValue, isReadOnly, isToggleButton,
     topIcon, topText, changeRules}: ConvertOperation) => {
    

    const {conversor} = useCurrency();
    const {state:quoteState,createConversionTable} = useQuote();
    
    const handleCurrency = (currency: string) => {

        dispatch({
            type: CurrencyActions.setSendCurrency,
            payload: { sendCurrency: currency }
        });
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { formattedValue, sanitizedValue } = formatNumber(e);
        setInputValue(formattedValue);

        const converted = sanitizedValue ? 
        conversor(sanitizedValue, state.sendCurrency, state.receiveCurrency, createConversionTable(quoteState)) : "00,00";

        setOutputValue(converted);

        dispatch({
            type: CurrencyActions.setSendValue,
            payload: { sendValue: formattedValue }
        });

        dispatch({
          type: CurrencyActions.setReceiveValue,
          payload: { receiveValue: converted }
        });
      
       dispatch({
          type: CurrencyActions.setFixOutput,
          payload: { fixOutput: false },
        });

        if(changeRules) {
            changeRules();
        }

    };

    return (

        <ValueSelect

            coin={coin}
            inputValue={value}
            onChange={handleChange}
            onCurrencyChange={handleCurrency}
            readOnlyInput={isReadOnly}
            topText={topText}
            topIcon={topIcon}
            toggleButtonPresent={isToggleButton}
    
        />

    );

}

export default InputSelect;