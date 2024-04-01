import { CurrencyActions } from "../../context/CurrencyContext";
import { QuoteState } from "../../context/QuoteContext";
import { pointsAll, pointsNone } from "../../types/Button/buttonVariables";
import { is0Value, isBalanceLessThanValue } from "../OperationValidities/operationValidities";


export const verifyIfIsValuable = (isValuable: boolean, setter: React.Dispatch<React.SetStateAction<string>>) => {


    return isValuable ? setter(pointsAll) : setter(pointsNone);

}

export const doValidations = (
    coinBalance: number, inputValue: string, outputValue: string,
    setIsValuable: React.Dispatch<React.SetStateAction<boolean>>, 
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
    ) => {


    const withoutValue = is0Value(inputValue, outputValue);
    const withoutBalance = isBalanceLessThanValue(
      parseFloat(inputValue),
      coinBalance
    );

    if (withoutValue || withoutBalance) {

      setIsValuable(false);
      setErrorMessage(withoutValue || withoutBalance);

    } else {

      setIsValuable(true);
      setErrorMessage("");

    }

}

export const controllValueChange = (
    
    converted: string, 
    setOutputValue: React.Dispatch<React.SetStateAction<string>>,
    dispatch: (action:any) => void, inputValue: string,
    setVisibility: React.Dispatch<React.SetStateAction<string>>,
    state: QuoteState,

    ) => {


        if (state.brl && state.usdc && state.usdt) {

            setOutputValue(converted);
      
            dispatch({
              type: CurrencyActions.setReceiveValue,
              payload: { receiveValue: converted },
            });
      
            dispatch({
              type: CurrencyActions.setSendValue,
              payload: { sendValue: inputValue },
            });
            
          }
          
          if (inputValue) {
              setVisibility("block");
          }
        
          if (inputValue === "00,00") {
              setVisibility("hidden");
          }

  }
  
  
