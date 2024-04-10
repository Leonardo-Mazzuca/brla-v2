import { TO_WEBSOCKET } from "../../contants/divisionValues/divisionValues";
import { CurrencyState } from "../../context/CurrencyContext";
import { sendCoinToWebSocket } from "../CurrencyService/sendCoinToWebSocket";
import { isUsdToBrla } from "../Util/isUsdToBrla";



export const sendMessageToSwap = (webSocket: WebSocket,state: CurrencyState) => {


    webSocket.send(JSON.stringify({

        messageId: 'qualquer',
        operation: 'Quote',
        data: {
            
            amount: state.fixOutput ? (state.receiveValue * TO_WEBSOCKET)
             : (state.sendValue * TO_WEBSOCKET),

            chain: 'Polygon',

            coin: isUsdToBrla(state) ? sendCoinToWebSocket(state.sendCurrency) : sendCoinToWebSocket(state.receiveCurrency),

            usdToBrla: isUsdToBrla(state),

            fixOutPut: state.fixOutput,

            operation: 'swap'
        }

    }));
}

