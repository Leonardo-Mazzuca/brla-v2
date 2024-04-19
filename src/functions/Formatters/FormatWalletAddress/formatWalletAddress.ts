


export const formatWalletAddress = (wallet: string) => {

    return `${wallet.slice(0, 6)}....${wallet.slice(-4)}`;

}