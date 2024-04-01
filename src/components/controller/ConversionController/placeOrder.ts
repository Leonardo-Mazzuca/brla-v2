

export function placeOrder(socket: WebSocket, quotedId: number) {


            const placeOrderMessage = {
    
                    messageId: "qualquer",
                    operation: "PlaceSwapOrder",
    
                    data: {
    
                        quoteId: quotedId,
                        notifyEmail: true,
                        // otp: message.data.code_1 + 
                        // message.data.code_2 + 
                        // message.data.code_3 + 
                        // message.data.code_4 + 
                        // message.data.code_5 + 
                        // message.data.code_6  
    
                    }
    
                };
    
            socket.send(JSON.stringify(placeOrderMessage));


}
