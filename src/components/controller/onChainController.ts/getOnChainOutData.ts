import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { http } from "../ConectAPI/conectApi";
import { formatWalletAddress } from "../../service/Formatters/FormatWalletAddress/formatWalletAddress";
import { getUserData } from "../UserDataController/getUserData";
import { getOnChainInData } from "./getOnChainInData";
import { BRLA_ON_CHAIN, USDTC_ON_CHAIN } from "../../contants/divisionValues/divisionValues";




export const getOnChainOutData = async () => {

    const CONVERT_DIVIDER = 1000000;

    try {

        const request = await http.get('/on-chain/history/out', {
            withCredentials: true,
        });

               
        const userData = await getUserData();
        const onChainInData = await getOnChainInData();
        
        const walletAddress=  userData?.wallets.evm;
        
        const data = request.data.onchainLogs.map((item:any) => {
        
            const outputValue = onChainInData.reduce((acc: number | null, data: any) => {

                if (!acc || new Date(data.createdAt) > new Date(item.createdAt)) {
                    return data;
                }

                return acc;
            }, null);
            
           
            const amountWithLatestDate = outputValue ? outputValue.amount : 0;
         
            
         return {

            id: item.id,
            inputCoin: item.inputCoin,
            outputCoin: item.outputCoin,
            from: item.from,
            title: item.chain,

            brlaAmount: amountWithLatestDate,
            usdAmount: getOnChainOutValue(parseFloat(item.value), item.outputCoin),
        
            transfers: {
                amount: getOnChainOutValue(parseFloat(item.value),item.outputCoin),
                taxId: formatWalletAddress(item.to),
            },

            operationName: walletAddress === item.to ? 'SWAP':
             item.smartContractOps.reduce((acc: string, op: any) => {
                acc = op.OperationName;
                return acc;
            }, '') ,
            
            feedback: item. smartContractOps.reduce((acc: string, op: any) => {
                acc = op.feedback;
                return acc;
            }, []),

            createdAt: item.createdAt,
            icon: faArrowUp,

        }});
        
        
        
        return data;
        

    } catch(e:any) {
        throw new Error('Erro ao pegar dados de onChain: ', e.message || e.data?.message);
    }

}

function getOnChainOutValue (value:number,coin:string) {

    switch(coin) {
        case 'USDT':
        case 'USDC':
            return value / USDTC_ON_CHAIN;
        default:
            return value / BRLA_ON_CHAIN;

    }

}