import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { formatWalletAddress } from "../../service/Formatters/FormatWalletAddress/formatWalletAddress";
import { http } from "../ConectAPI/conectApi";
import { ExpectedConversionData} from "../ValuesListingController/getConversionData";
import formatDate from "../../service/Formatters/FormatDate/formatDate";
import {  ON_CHAIN_IN_DATA, ON_CHAIN_OUT_DATA, PAYMENT_DATA, SWAP_DATA } from "../../contants/sessionStorageKeys/sessionStorageKeys";
import { saveTransactionsData } from "../../service/SessionStorageService/saveAllInSessionStorage";


export type ExpectedOnChainInData = {

    fromAddress: string;
    toAddress: string;
    amount: string;
    createdAt: string;
    chain: string;
    tx:string;
    id: string;
    tokenAddress: string;

}


export const saveOnChainInData = async () => {


    try {

        const request = await http.get('/on-chain/history/in', {
            withCredentials: true,
        });

        const currentData = (request.data.onchainLogs);

        sessionStorage.setItem(ON_CHAIN_IN_DATA, JSON.stringify(currentData));

        const storedData = sessionStorage.getItem(ON_CHAIN_IN_DATA);

        const dataChanged = JSON.stringify(currentData) !== JSON.stringify(storedData);
        
        if (dataChanged) {
            sessionStorage.setItem(ON_CHAIN_IN_DATA, JSON.stringify(currentData));
        }

    } catch(e:any) {

    }


}



export const getOnChainInData = async () => {


    try {

        const request = await http.get('/on-chain/history/in', {
            withCredentials: true,
        });

        
        const onChainIn = request.data.onchainLogs;

        const paymentData = JSON.parse(sessionStorage.getItem(PAYMENT_DATA) ?? '{}');
        const swapData = JSON.parse(sessionStorage.getItem(SWAP_DATA)??'{}') ;
        const onChainOut = JSON.parse(sessionStorage.getItem(ON_CHAIN_OUT_DATA) ?? '{}')
        
        
        if(paymentData && swapData && onChainOut){

        const txOut = onChainOut.data.onchainLogs.map((item: any) => ({
            tx: item.smartContractOps.map((op: any) => op.Tx)[0],
        }));

            const data = onChainIn.map((item: ExpectedOnChainInData) => {
        
                    const matchingConversion = swapData.find((data: ExpectedConversionData) => data.tx === item.tx);
                    const matchingOnChainOut = txOut.find((data: any) => data.tx === item.tx);
                    const matchingPayment = paymentData.find((data: any) => data.tx === item.tx);
                
                    if (!matchingConversion && !matchingPayment && !matchingOnChainOut) {
        
                        return {
        
                            operationName: 'MINT',
                            walletAddress: formatWalletAddress(item.fromAddress),
                            amount: parseFloat(item.amount),
                            date: formatDate(item.createdAt),
                            createdAt: item.createdAt,
                            title: item.chain,
                            icon: faPlus,
                            tx: item.tx,
                            id: item.id,
                            coin: getCoinByHash(item.tokenAddress),
                            tokenAddress: item.tokenAddress,
        
                        };
        
                    } else {
                        return null; 
                    }
    
                });
    
                const filteredData = data.filter((item:any) => item !== null); 
    
                
                return filteredData;

        } 

        

    } catch (e: any) {

        console.error(e.message || e.data?.message)
        throw new Error("Erro ao pegar dados de onChain in: ", e.message || e.data?.message);

    }

};



//production

function getCoinByHash (hash: string) {
    
    
    switch(hash) {
        case "0xE6A537a407488807F0bbeb0038B79004f19DDDFb":
            return 'BRL'
        case "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174":
            return 'USDC'
        case "0xc2132D05D31c914a87C6611C10748AEb04B58e8F":
            return 'USDT'
    }

}


//sandbox
// function getCoinByHash (hash: string) {

//     switch(hash) {
//         case '0x658e5EA3c7690f0626aFF87cEd6FC30021A93657':
//             return 'BRL'
//         case '0x0FA8781a83E46826621b3BC094Ea2A0212e71B23':
//             return 'USDC'
//         case '0xF829E45519804caC42376d67D054D70e64C19d29':
//             return 'USDT'
//     }

// }