import { faArrowRightArrowLeft, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { http } from "../ConectAPI/conectApi";
import { formatWalletAddress } from "../../service/Formatters/FormatWalletAddress/formatWalletAddress";
import { getUserData } from "../UserDataController/getUserData";
import { getOnChainInData } from "./getOnChainInData";
import {  USDTC_ON_CHAIN } from "../../contants/divisionValues/divisionValues";
import { formatNumberToString } from "../../service/Formatters/FormatNumber/formatNumber";




export const getOnChainOutData = async () => {


    try {

        const request = await http.get('/on-chain/history/out', {
            withCredentials: true,
        });

               
        const userData = await getUserData();
        const onChainInData = await getOnChainInData();
        
        
        const walletAddress=  userData?.wallets.evm;


        const data = request.data.onchainLogs.map((item:any) => {

        const txs = item.smartContractOps.map((op: any) => op.Tx);
        const correspondingInData = onChainInData.filter((inItem: any) => txs.includes(inItem.tx));
        

        const inputValue = correspondingInData
        .filter((item: any) => item !== undefined)
        .map((item: any) => item.amount)[0];


         return {

            id: item.id,
            inputCoin: item.inputCoin,
            outputCoin: item.outputCoin,
            from: item.from,
            title: item.chain,

            usdAmount: inputValue ?? getOnChainOutValue(parseFloat(item.value), item.inputCoin),
            brlaAmount: getOnChainOutValue(parseFloat(item.value), item.outputCoin),

            inputValue: formatNumberToString(inputValue ?? getOnChainOutValue(parseFloat(item.value), item.inputCoin)) + ' ' + item.inputCoin,
            outputValue:formatNumberToString(getOnChainOutValue(parseFloat(item.value), item.outputCoin)) + ' ' + item.outputCoin,
          
            
            amount: getOnChainOutValue(parseFloat(item.value),item.outputCoin),
            
            transfers: {
                amount: getOnChainOutValue(parseFloat(item.value),item.outputCoin),
                taxId: formatWalletAddress(item.to),
            },

            operationName: walletAddress === item.to ? 'SWAP':
             item.smartContractOps.reduce((acc: string, op: any) => {
                acc = op.OperationName;
                return acc;
            }, '') ,
            
            feedback: item.smartContractOps.reduce((acc: string, op: any) => {
                acc = op.feedback;
                return acc;
            }, []),

            createdAt: item.createdAt,
            icon: walletAddress === item.to ? faArrowRightArrowLeft : faArrowUp,
            isPaymentChain: item.inputCoin === item.outputCoin,
            isOnChain: true,

        }});

        // console.log('On chain out: ', data);
        
        
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
            return value;

    }

}



