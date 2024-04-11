


export const sendCoinToWebSocket = (currency: string) => {


    switch(currency) {

        case 'BRL':
            return 'USDC';
        default:
            return currency;

    }

}