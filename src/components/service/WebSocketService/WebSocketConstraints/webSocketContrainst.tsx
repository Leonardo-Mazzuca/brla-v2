import { CurrencyState } from "../../../context/CurrencyContext";
import { isTheSameCoin } from "../../OperationValidities/operationValidities";
import { isBrl } from "../../Util/isBrl";
import { isUsdcToUsdc, isUsdtToUsdt } from "../../Util/isTheSameUSDCoin";
import { isUsdToBrla } from "../../Util/isUsdToBrla";
import { isUsdcToUsdt, isUsdtToUsdc } from "../../Util/onChain";




export const isUsdcOrUsdt = (state: CurrencyState) => {
    return isUsdcToUsdt(state) || isUsdtToUsdc(state);
}

export const isBrlToBrl = (state: CurrencyState) => {
    return state.sendCurrency === 'BRL' && state.receiveCurrency === 'BRL';
}

export const neitherBrlAndUsd = (state: CurrencyState) => {
    return !isBrl(state) && (!isUsdcToUsdt(state) && !isUsdtToUsdc(state) && !isTheSameCoin(state.sendCurrency, state.receiveCurrency));
}

export const usdToBrla = (state: CurrencyState) => {
    return isUsdToBrla(state);
}

export const isOnChain = (state: CurrencyState) => {
    return isUsdcToUsdt(state) || isUsdtToUsdc(state) || isUsdcToUsdc(state.sendCurrency, state.receiveCurrency) || isUsdtToUsdt(state.sendCurrency, state.receiveCurrency);
}

export const isBrlaToUsd = (state:CurrencyState) => {
    return (state.sendCurrency === 'BRL' && state.receiveCurrency === 'USDC') ||
    (state.sendCurrency === 'BRL' && state.receiveCurrency === 'USDT' )
}