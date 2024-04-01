import { Web3 } from 'web3';
import {  getUserData } from '../UserDataController/getUserData';
import { BRLAContractAbi, USDCContractAbi, USDTContractAbi } from './abis';
import { BRLA_CONTRACT_ADDRESS, POLYGON_URL, USDC_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS } from './blockchainData';
import { UserData } from '../../types/UserData/UserData';

const getUserTokenBalance = async (

    web3: Web3, 
    contractAddress: string,
    contractAbi: any, 
    userData: UserData,
    decimals: number) => {

    try {

        const contract = new web3.eth.Contract(contractAbi, contractAddress);
        const rawBalance: BigInt = await contract.methods.balanceOf(userData.wallets.evm).call();
        return Number(rawBalance) / 10 ** decimals;

    } catch (error:any) {
        throw new Error(`Failed to get token balance: ${error.message}`);
    }
};

export async function userBalanceController () {
    
    try {

        const web3 = new Web3(POLYGON_URL);
        const userData: UserData | undefined = await getUserData();
    
        
        if(userData) {
            
            const brlBalance = await getUserTokenBalance(web3, BRLA_CONTRACT_ADDRESS, BRLAContractAbi, userData, 18);
            const usdcBalance = await getUserTokenBalance(web3, USDC_CONTRACT_ADDRESS, USDCContractAbi, userData, 6);
            const usdtBalance = await getUserTokenBalance(web3, USDT_CONTRACT_ADDRESS, USDTContractAbi, userData, 6);
            
            return {brlBalance, usdcBalance, usdtBalance};
            
        } else {

            return false;
            
        }


    } catch (error: any) {
        console.error(error);
        throw error;
    }
}
