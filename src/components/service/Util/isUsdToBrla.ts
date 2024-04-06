


export const isUsdToBrla = (inputCoin: string, outputCoin: string) => {

    const isUsdtToBrla = (inputCoin === 'USDT' && outputCoin === 'BRLA');
    const isUsdcToBrla = (inputCoin === 'USDC' && outputCoin === 'BRLA');

    return isUsdtToBrla || isUsdcToBrla;

}