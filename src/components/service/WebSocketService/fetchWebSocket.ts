
import { connectWebSocket } from "../../controller/WebSocketController/connectWebSocket";
import { WebSocketActions, WebSocketState } from "../../context/WebSocketContext";



async function dispatchWebSocket( dispatch : (action: any) => void) {

    const webSocket = await connectWebSocket();
    
    dispatch({
        
        type: WebSocketActions.setWebSocket,
        payload: { webSocket }

    });
    
}

export async function fetchWebSocket(state: WebSocketState, dispatch: (action: any) => void) {

    if (!state.webSocket || !state.webSocket.OPEN) {

        await dispatchWebSocket(dispatch);
    
    } 
    
}

