import { POINTS_ALL } from "../../../contants/classnames/classnames";
import { CurrencyState } from "../../../context/CurrencyContext";
import { getUserData } from "../../../controller/UserDataController/getUserData";
import { isForWebSocketOnSwap } from "../../WebSocketService/Conversion/isForWebSocket";



export function initConversion(state: CurrencyState, setInputValue: React.Dispatch<React.SetStateAction<number>>, setOutputValue: React.Dispatch<React.SetStateAction<number>>, setWalletAddress: React.Dispatch<React.SetStateAction<string>>, 
    setButtonClassname: React.Dispatch<React.SetStateAction<string>>) {


    setInputValue(state.sendValue)
    setOutputValue(state.receiveValue);

    const getWallet = async () => {

        const data = await getUserData();
        if(data?.wallets.evm) {
            setWalletAddress(data.wallets.evm);
        }
    }
    
    if(!isForWebSocketOnSwap(state)) {
        setButtonClassname(POINTS_ALL);
    }

    getWallet();

}   
