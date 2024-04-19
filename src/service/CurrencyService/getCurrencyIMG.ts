

export function getCurrencyIMG(currency: string): string {

    switch (currency) {

        case 'BRL':
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/800px-Flag_of_Brazil.svg.png";
        case 'USDC':
            return "https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/32/color/usdc.png";
        case 'USDT':
            return "https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/32/color/usdt.png";
        default:
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/800px-Flag_of_Brazil.svg.png';

    }
    
}
