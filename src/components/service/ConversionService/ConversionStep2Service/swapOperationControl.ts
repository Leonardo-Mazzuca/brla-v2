import { HIDDEN, POINTS_ALL } from "../../../contants/classnames/classnames";
import { CurrencyState } from "../../../context/CurrencyContext";



export function swapOperationControl (isForWebSocket: (state: CurrencyState) => boolean,
     setButtonClassname: React.Dispatch<React.SetStateAction<string>>, success: boolean, error:boolean,
     socketMessageHandler: ()=> void, state: CurrencyState
     
     ) {

        if(isForWebSocket(state)) {
            socketMessageHandler();
        }

        if(success || error) {
            setButtonClassname(HIDDEN);
        }

        if(!isForWebSocket(state)) {
            setButtonClassname(POINTS_ALL);
        }
        

}   