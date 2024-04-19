


export const getCurrencyCoinToFormat = (coin:string) => {

    
    switch(coin) {

        case 'USDT':
        case 'USDC':
        case 'USD' :
            return 'USD';

        default :
            return 'BRL';
            
    }

}