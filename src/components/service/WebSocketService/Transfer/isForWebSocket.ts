import { CurrencyState } from "../../../context/CurrencyContext";
import { neitherBrlAndUsd, usdToBrla } from "../WebSocketConstraints/webSocketContrainst";






export const isForWebSocketOnTransfer = (state: CurrencyState)=> {

    return neitherBrlAndUsd(state) || usdToBrla(state);

}