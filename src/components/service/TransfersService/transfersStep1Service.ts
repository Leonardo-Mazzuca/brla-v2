import { CurrencyActions, CurrencyState } from "../../context/CurrencyContext";
import { QuoteState } from "../../context/QuoteContext";
import { WebSocketState } from "../../context/WebSocketContext";
import { pointsAll, pointsNone } from "../../types/Button/buttonVariables";
import { is0Value, isBalanceLessThanValue, isWebSocketOff } from "../OperationValidities/operationValidities";
import { isForWebSocketOnTransfer } from "../WebSocketService/Transfer/isForWebSocket";


export const verifyIfIsValuable = (isValuable: boolean, setter: React.Dispatch<React.SetStateAction<string>>) => {


    return isValuable ? setter(pointsAll) : setter(pointsNone);

}

export const doValidations = (
    coinBalance: number, inputValue: number, outputValue: number,
    setIsValuable: React.Dispatch<React.SetStateAction<boolean>>, 
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    state: CurrencyState, webSocketState: WebSocketState
    ) => {


    const withoutValue = is0Value(inputValue, outputValue);
    const withoutBalance = isBalanceLessThanValue(
      inputValue,
      coinBalance,
    ); 
    

    if(isForWebSocketOnTransfer(state)) {

        if (withoutValue || withoutBalance || isWebSocketOff(webSocketState)) {
    
          setIsValuable(false);
          setErrorMessage(withoutValue || withoutBalance);
      
        } else {
      
          setIsValuable(true);
          setErrorMessage("");
      
        }

    } else {

      if (withoutValue || withoutBalance) {
    
        setIsValuable(false);
        setErrorMessage(withoutValue || withoutBalance);
    
      } else {
    
        setIsValuable(true);
        setErrorMessage("");
    
      }

    }


    


    


}

export const controllValueChange = (
    
    converted: number, 
    setOutputValue: React.Dispatch<React.SetStateAction<number>>,
    dispatch: (action:any) => void, inputValue: number,
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
        
          if (!inputValue) {
              setVisibility("hidden");
          }

  }
  
  
