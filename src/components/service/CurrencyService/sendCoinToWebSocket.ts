


export const sendCoinToWebSocket = (currency: string) => {


    switch(currency) {

        case 'BRLA':
            return 'USDC';
        default:
            return currency;

    }

}