import { CurrencyState } from "../../../context/CurrencyContext";
import { neitherBrlAndUsd, usdToBrla } from "../WebSocketConstraints/webSocketContrainst";






export const isForWebSocketOnTransfer = (state: CurrencyState)=> {

    if(neitherBrlAndUsd(state) || usdToBrla(state)) {
        return true
    }
    
    return false;

}