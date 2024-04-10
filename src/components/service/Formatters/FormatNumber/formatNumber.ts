import { getCurrencyCoinToFormat } from "../../CoinsService/getCurrencyCoinToFormat";


export const formatNumberToString = (number: number, currency?: string) => {
    
    
    if (number === 0) {

        return '00,00';

    } else if (currency) {

         const coin = getCurrencyCoinToFormat(currency);

         return new Intl.NumberFormat('en-US', { style: 'currency',
         minimumFractionDigits: number < 0.01 ? 3 : 2,
         currency:  coin}).format(number);

    } else {

        const options = {
            
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            minimumIntegerDigits: 2,
            
            useGrouping: true,  
        };

        return number.toLocaleString('en-IN', options);
        
    }

}



