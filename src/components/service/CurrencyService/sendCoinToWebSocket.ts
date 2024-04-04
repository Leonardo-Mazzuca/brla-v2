


export const sendCoinToWebSocket = (currency: string) => {


    switch(currency) {

        case 'BRL':
            return 'BRLA';
        default:
            return currency;

    }

}