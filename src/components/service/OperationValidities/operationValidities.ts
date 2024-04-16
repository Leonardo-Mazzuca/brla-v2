import { WebSocketState } from "../../context/WebSocketContext";


export const is0Value = (inputValue: number, outputValue: number) => {

    if(!inputValue || inputValue < 0 || !outputValue || outputValue < 0) {
        return 'Insira um valor para continuar';
    } 
    return '';

}

export const isTheSameCoin = (inputCoin: string, outputCoin: string) => {

    if(inputCoin === outputCoin) {
        return 'Conversões para um mesmo tipo não são permitidas';
    } else {
        return '';
    }

}

export const isBalanceLessThanValue = (inputValue: number, balance: number) => {


    if(parseFloat(inputValue.toFixed(2)) > parseFloat(balance.toFixed(2))) {
        return 'Saldo insuficiente';
    
    } else {
        return '';
    }

}

export const isWebSocketOff = (webSocketState: WebSocketState) => {
    return webSocketState.webSocket === null;
}