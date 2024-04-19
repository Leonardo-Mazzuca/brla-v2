
import { WebSocketActions, WebSocketState } from "../../context/WebSocket/WebSocketContext";
import { connectWebSocket } from "../../controller/WebSocketController/connectWebSocket";




async function dispatchWebSocket(dispatch : (action: any) => void) {

    const webSocket = await connectWebSocket();
    
    dispatch({
        
        type: WebSocketActions.setWebSocket,
        payload: { webSocket }

    });

    return webSocket.OPEN;
    
}

export async function fetchWebSocket(state: WebSocketState, dispatch: (action: any) => void) {

    if (!state.webSocket || !state.webSocket.OPEN) {

        const isConected = await dispatchWebSocket(dispatch);
        return isConected
    
    } 
    
}

