


export const getCurrencyCoinToFormat = (coin:string) => {

    switch(coin) {

        case 'USDT':
        case 'USDC':
            return 'USD';

        default :
            return 'BRL';
            
    }

}