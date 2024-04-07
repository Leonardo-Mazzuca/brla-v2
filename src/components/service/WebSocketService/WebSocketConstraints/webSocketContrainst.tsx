import { CurrencyState } from "../../../context/CurrencyContext";
import { isBrl } from "../../Util/isBrl";
import { isUsdcToUsdc, isUsdtToUsdt } from "../../Util/isTheSameUSDCoin";
import { isUsdToBrla } from "../../Util/isUsdToBrla";
import { isUsdcToUsdt, isUsdtToUsdc } from "../../Util/onChain";




export const isUsdcOrUsdt = (state: CurrencyState) => {
    return isUsdcToUsdt(state) || isUsdtToUsdc(state);
}

export const isBrlToBrl = (state: CurrencyState) => {
    return state.sendCurrency === 'BRLA' && state.receiveCurrency === 'BRLA';
}

export const neitherBrlAndUsd = (state: CurrencyState) => {
    return !isBrl(state) && (!isUsdcToUsdt(state) && !isUsdtToUsdc(state));
}

export const usdToBrla = (state: CurrencyState) => {
    return isUsdToBrla(state.sendCurrency, state.receiveCurrency);
}

export const isOnChain = (state: CurrencyState) => {
    return isUsdcToUsdt(state) || isUsdtToUsdc(state) || isUsdcToUsdc(state.sendCurrency, state.receiveCurrency) || isUsdtToUsdt(state.sendCurrency, state.receiveCurrency);
}