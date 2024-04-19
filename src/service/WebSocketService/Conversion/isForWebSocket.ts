
import { CurrencyState } from "../../../context/Currency/CurrencyContext";
import { isUsdToBrla } from "../../../Util/isUsdToBrla";
import { isBrlaToUsd } from "../WebSocketConstraints/webSocketContrainst";

export const isForWebSocketOnSwap = (state: CurrencyState) => {

    return (isUsdToBrla(state)) || isBrlaToUsd(state);
     

}