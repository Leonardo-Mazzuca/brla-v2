import { useEffect } from "react";
import { CurrencyActions, useCurrency } from "../../context/CurrencyContext";
import { useQuote } from "../../context/QuoteContext";


export const useValueChange = (sendValue: string, receiveValue: string, setConvertedValue: React.Dispatch<React.SetStateAction<string>>) => {
    const { state, dispatch, conversor } = useCurrency();
    const {state:quoteState,createConversionTable} =  useQuote();


    useEffect(() => {

        if (sendValue !== "00,00" && receiveValue !== "00,00") {
            
            if (state.sendCurrency !== state.receiveCurrency) {
              
                const converted = conversor(sendValue, state.sendCurrency, state.receiveCurrency, createConversionTable(quoteState));
                setConvertedValue(converted);

            }

        }

        dispatch({
            type: CurrencyActions.setSendValue,
            payload: { sendValue }
        });

        dispatch({
            type: CurrencyActions.setReceiveValue,
            payload: { receiveValue }
        });

    }, [state.sendCurrency, state.receiveCurrency, sendValue, receiveValue, setConvertedValue, dispatch]);
}
