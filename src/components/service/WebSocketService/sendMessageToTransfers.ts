import { CurrencyState } from "../../context/CurrencyContext";
import { sendCoinToWebSocket } from "../CurrencyService/sendCoinToWebSocket";
import { usdToBrla } from "./WebSocketConstraints/webSocketContrainst";



export const sendMessageToTransfers = (state: CurrencyState, webSocket: WebSocket) => {

    if (webSocket && webSocket.OPEN) {
                  
        webSocket.send(JSON.stringify({

            messageId: 'qualquer',
            operation: 'Quote',

            data: {
                
                amount: (state.sendValue * 100),
        
                chain: 'Polygon',

                coin: sendCoinToWebSocket(state.receiveCurrency),
             
                usdToBrla: usdToBrla(state),

                fixOutPut: state.fixOutput,

                operation: !usdToBrla(state) ? 'swap' : 'pix-to-usd',

            }

        }));

    }

}