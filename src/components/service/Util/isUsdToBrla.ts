


export const isUsdToBrla = (inputCoin: string, outputCoin: string) => {

    const isUsdtToBrla = (inputCoin === 'USDT' && outputCoin === 'BRL');
    const isUsdcToBrla = (inputCoin === 'USDC' && outputCoin === 'BRL');

    return isUsdtToBrla || isUsdcToBrla;

}