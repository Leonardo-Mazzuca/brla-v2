import { CurrencyState } from "../../../context/CurrencyContext";
import { isUsdcToUsdt, isUsdtToUsdc } from "../../Util/onChain";



export const isForWebSocketOnSwap = (state: CurrencyState) => {
    return (!isUsdcToUsdt(state) && !isUsdtToUsdc(state))
}