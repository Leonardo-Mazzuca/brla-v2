import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { formatWalletAddress } from "../../service/Formatters/FormatWalletAddress/formatWalletAddress";
import { http } from "../ConectAPI/conectApi";
import { ExpectedConversionData, getConversionData } from "../ValuesListingController/getConversionData";
import formatDate from "../../service/Formatters/FormatDate/formatDate";
import { getOnChainOutData } from "./getOnChainOutData";



type ExpectedOnChainInData = {

    fromAddress: string;
    toAddress: string;
    amount: string;
    createdAt: string;
    chain: string;
    tx:string;
    id: string;
    tokenAddress: string;

}

export const getOnChainInData = async () => {

    try {

        const request = await http.get('/on-chain/history/in', {
            withCredentials: true,
        });

        const onChainOut = await http.get('/on-chain/history/out', {
            withCredentials: true,
        });

        const payment = await http.get('/payment/history', {
            withCredentials: true,
        });
        
        const paymentTx = payment.data.paymentLogs.reduce((acc: any[], item: any) => {
            const paymentOps = item.paymentOps || [];
        
            paymentOps.forEach((op: any) => {
                const smartContractOps = op.smartContractOps || [];
                
                
                smartContractOps.forEach((smOps: any) => {

                    if(smOps.tx && smOps.operationName === 'BURN')
                        acc.push(smOps.tx);
                    
                });
            });
        
            return acc;

        }, []);
   

        const txOut = onChainOut.data.onchainLogs.map((item: any) => ({
            tx: item.smartContractOps.map((op: any) => op.Tx)[0],
        }));

        const conversionData = await getConversionData();

        const data = request.data.onchainLogs.map((item: ExpectedOnChainInData) => {

            const matchingConversion = conversionData.find((data: ExpectedConversionData) => data.tx === item.tx);
            const matchingOnChainOut = txOut.find((data: any) => data.tx === item.tx);
            const matchingPayment = paymentTx.find((data: any) => data.tx === item.tx);

            if (!matchingConversion && !matchingOnChainOut && !matchingPayment) {

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

    } catch (e: any) {
        throw new Error("Erro ao pegar dados de onChain in: ", e.message || e.data?.message);
    }
};



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

//production

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