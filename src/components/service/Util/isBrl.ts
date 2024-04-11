import { CurrencyState } from "../../context/CurrencyContext";



export const isBrl = (state: CurrencyState) => {
    return state.receiveCurrency === 'BRL';
}