import { getCurrencyCoinToFormat } from "../../../service/CoinsService/getCurrencyCoinToFormat";


export const formatNumberToString = (number: number, currency?: string) => {

    try {
        
        if (number === 0 || !number) {
    
            return '00,00';
    
        } else if (currency) {
    
             const coin = getCurrencyCoinToFormat(currency);
    
             return new Intl.NumberFormat('en-US', { style: 'currency',

             minimumFractionDigits: number <= 0.01 ? 4 : 2,

             currency: coin}).format(number);
    
        } else {
    
            const options = {
                
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                minimumIntegerDigits: 2,
                useGrouping: true,  
            };
    
            return number.toLocaleString('en-US', options);
            
        }

    } catch(e:any) {
        throw e;
    }

}



