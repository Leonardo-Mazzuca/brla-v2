import { CurrencyState } from "../context/Currency/CurrencyContext";



export const isUsdToBrla = (state:CurrencyState) => {

    return ((state.sendCurrency === 'USDC' || state.sendCurrency === "USDT")
     && state.receiveCurrency === 'BRL');


}