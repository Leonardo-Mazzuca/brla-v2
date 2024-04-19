import { CurrencyState } from "../context/Currency/CurrencyContext";


export const isBrl = (state: CurrencyState) => {
    return state.receiveCurrency === 'BRL';
}