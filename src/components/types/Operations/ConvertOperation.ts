import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { CoinTypes, CurrencyState } from "../../context/CurrencyContext";



export type ConvertOperation = {

    coin: CoinTypes;
    value:number;
    dispatch: (action: any) => void;
    changeRules?: () => void;
    state: CurrencyState;
    setInputValue: React.Dispatch<React.SetStateAction<number>>;
    setOutputValue: React.Dispatch<React.SetStateAction<number>>;
    isReadOnly? : boolean;
    isToggleButton? : boolean;
    topIcon?: IconProp;
    topText?: string;

    
}