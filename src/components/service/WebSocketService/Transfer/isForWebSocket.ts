import { CurrencyState } from "../../../context/CurrencyContext";
import { isTheSameCoin } from "../../OperationValidities/operationValidities";
import { isUsdcToUsdt, isUsdtToUsdc } from "../../Util/onChain";






export const isForWebSocket = (state: CurrencyState)=> {

    return !(isUsdcToUsdt(state) && isUsdtToUsdc(state) &&  
    !(state.sendCurrency === state.receiveCurrency) && 
    (!isTheSameCoin(state.sendCurrency, state.receiveCurrency)));

}