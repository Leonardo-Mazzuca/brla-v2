import { CurrencyState } from "../../context/CurrencyContext";
import { sendCoinToWebSocket } from "../CurrencyService/sendCoinToWebSocket";
import { isUsdToBrla } from "../Util/isUsdToBrla";
import { usdToBrla } from "./WebSocketConstraints/webSocketContrainst";



export const sendMessageToTransfers = (state: CurrencyState, webSocket: WebSocket) => {

    if (webSocket && webSocket.OPEN) {
                  
        webSocket.send(JSON.stringify({

            messageId: 'qualquer',
            operation: 'Quote',

            data: {
                
                amount: Number(state.sendValue * 100),
        
                chain: 'Polygon',

                coin: isUsdToBrla(state) ? sendCoinToWebSocket(state.sendCurrency) : sendCoinToWebSocket(state.receiveCurrency),
             
                usdToBrla: isUsdToBrla(state),

                fixOutPut: state.fixOutput,

                operation: !usdToBrla(state) ? 'swap' : 'pix-to-usd',

            }

        }));

    }

}