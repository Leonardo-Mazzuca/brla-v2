import { Web3 } from 'web3';
import {  getUserData } from '../UserDataController/getUserData';
import { BRLAContractAbi, USDCContractAbi, USDTContractAbi } from './abis';
import { BRLA_CONTRACT_ADDRESS, POLYGON_URL, USDC_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS } from './blockchainData';
import { UserData } from '../../types/UserData/UserData';
import { BRLA_ON_CHAIN, USDTC_ON_CHAIN } from '../../contants/divisionValues/divisionValues';
import { USER_DATA } from '../../contants/sessionStorageKeys/sessionStorageKeys';

const getUserTokenBalance = async (

    web3: Web3, 
    contractAddress: string,
    contractAbi: any, 
    userData: UserData,
    decimals: number) => {

    try {

        const contract = new web3.eth.Contract(contractAbi, contractAddress);
        const rawBalance: BigInt = await contract.methods.balanceOf(userData.wallets.evm).call();
        
        return Number(rawBalance) / decimals;

    } catch (error:any) {

        throw new Error(`Failed to get token balance: ${error.message}`);
        
    }
};

export async function userBalanceController () {
    
    try {

        const web3 = new Web3(POLYGON_URL);
        const userData: UserData = JSON.parse(sessionStorage.getItem(USER_DATA)??'{}');
        
        if(userData) {
            
            const brlBalance = await getUserTokenBalance(web3, BRLA_CONTRACT_ADDRESS, BRLAContractAbi, userData, BRLA_ON_CHAIN);
            const usdcBalance = await getUserTokenBalance(web3, USDC_CONTRACT_ADDRESS, USDCContractAbi, userData, USDTC_ON_CHAIN);
            const usdtBalance = await getUserTokenBalance(web3, USDT_CONTRACT_ADDRESS, USDTContractAbi, userData, USDTC_ON_CHAIN);
            
            
            return {brlBalance, usdcBalance, usdtBalance};
            
        } else {

            return false;
            
        }


    } catch (error: any) {
        
        console.error(error.message || error.data?.message)
        throw error;

    }
}
