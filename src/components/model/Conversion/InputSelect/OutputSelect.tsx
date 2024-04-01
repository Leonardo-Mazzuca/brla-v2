import { CurrencyActions, useCurrency } from "../../../context/CurrencyContext";
import { useQuote } from "../../../context/QuoteContext";
import { formatNumber } from "../../../service/Formatters/FormatNumber/formatNumber";
import { ConvertOperation } from "../../../types/Operations/ConvertOperation";
import ValueSelect from "../../ValueSelect/ValueSelect";



const OutputSelect:React.FC <ConvertOperation>
= ({state, coin, value, dispatch, setInputValue, setOutputValue, isReadOnly, isToggleButton, topIcon, topText}) => {

    const {conversor} = useCurrency();
    const {state:quoteState, createConversionTable} = useQuote();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        
        const { formattedValue, sanitizedValue } = formatNumber(e);
        const converted = sanitizedValue ? conversor
        (sanitizedValue, state.receiveCurrency, state.sendCurrency, createConversionTable(quoteState)) : "00,00";

        setOutputValue(formattedValue);
        setInputValue(converted);

        dispatch({
            type: CurrencyActions.setSendValue,
            payload: { sendValue: converted }
        });

        dispatch({
            type: CurrencyActions.setReceiveValue,
            payload: { receiveValue: formattedValue }
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

export default OutputSelect;