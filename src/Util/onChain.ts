import { CurrencyState } from "../context/Currency/CurrencyContext";



export const isUsdcToUsdt = (state: CurrencyState) => {
    return state.sendCurrency === 'USDC' && state.receiveCurrency === 'USDT';
}

export const isUsdtToUsdc = (state: CurrencyState) => {
    return state.sendCurrency === 'USDT' && state.receiveCurrency === 'USDC';
}