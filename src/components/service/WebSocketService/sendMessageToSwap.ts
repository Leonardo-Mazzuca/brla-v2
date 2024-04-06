import { CurrencyState } from "../../context/CurrencyContext";
import { sendCoinToWebSocket } from "../CurrencyService/sendCoinToWebSocket";
import { isUsdToBrla } from "../Util/isUsdToBrla";



export const sendMessageToSwap = (webSocket: WebSocket,state: CurrencyState) => {


    webSocket.send(JSON.stringify({

        messageId: 'qualquer',
        operation: 'Quote',
        data: {
            
            amount: state.fixOutput ? (state.receiveValue * 100)
             : (state.sendValue * 100),

            chain: 'Polygon',

            coin: sendCoinToWebSocket(state.receiveCurrency),

            usdToBrla: isUsdToBrla(state.sendCurrency, state.receiveCurrency),

            fixOutPut: state.fixOutput,

            operation: 'swap'
        }

    }));
}

