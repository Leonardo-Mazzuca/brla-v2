
import { getWebSocketToken } from "./getWebSocketToken";


export async function connectWebSocket() {


    const token = await getWebSocketToken();

    try {

        const SOCKET_SERVER_URL_SANDBOX = `wss://api.brla.digital:4567/v1/websocket/${token}`;
        const SOCKET_SERVER_URL_PRODUCTION = `wss://api.brla.digital:5567/v1/websocket/${token}`;
        const webSocket = new WebSocket(SOCKET_SERVER_URL_PRODUCTION);


        webSocket.onopen = event => {
          
            console.log('Conexão WebSocket estabelecida!', event);
            sessionStorage.setItem("wsConnected", "true");

          };
    
          webSocket.onmessage = event => {
            console.log('Mensagem recebida:', event.data);
          };
    
          webSocket.onclose = event => {
            console.log('Conexão WebSocket fechada:', event);
            sessionStorage.removeItem("wsConnected");
            
          };
    
          webSocket.onerror = error => {

            console.error('Erro na conexão WebSocket:', error);
            
          };

          return webSocket;

    } catch(e:any) {

        throw e;

    }
    
}