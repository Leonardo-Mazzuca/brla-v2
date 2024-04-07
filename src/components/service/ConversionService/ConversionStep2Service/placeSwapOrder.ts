


export function placeSwapOrder (webSocket: WebSocket, quoteId: number) {

    webSocket.send(JSON.stringify({
    
                   
        messageId: "qualquer",
        operation: "PlaceSwapOrder",

        data: {

            quoteId: quoteId,
            notifyEmail: true,
            // otp: message.data.code_1 + 
            // message.data.code_2 + 
            // message.data.code_3 + 
            // message.data.code_4 + 
            // message.data.code_5 + 
            // message.data.code_6  

        }
            
    }));

}

