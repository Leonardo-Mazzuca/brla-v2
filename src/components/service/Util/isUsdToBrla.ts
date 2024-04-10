import { CurrencyState } from "../../context/CurrencyContext";



export const isUsdToBrla = (state:CurrencyState) => {

    return ((state.sendCurrency === 'USDC' || state.sendCurrency === "USDT")
     && state.receiveCurrency === 'BRLA');


}