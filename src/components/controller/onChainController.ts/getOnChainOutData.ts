import { faArrowRightArrowLeft, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { http } from "../ConectAPI/conectApi";
import { formatWalletAddress } from "../../service/Formatters/FormatWalletAddress/formatWalletAddress";
import {  USDTC_ON_CHAIN } from "../../contants/divisionValues/divisionValues";
import { formatNumberToString } from "../../service/Formatters/FormatNumber/formatNumber";
import { ON_CHAIN_IN_DATA, ON_CHAIN_OUT_DATA, SERIALIZED_ON_CHAIN_OUT_DATA, USER_DATA } from "../../contants/sessionStorageKeys/sessionStorageKeys";
import { UserData } from "../../types/UserData/UserData";



export const saveOnChainOutData = async () => {


    try {

        const request = await http.get('/on-chain/history/out', {
            withCredentials: true,
        });

        const currentData = request

        sessionStorage.setItem(ON_CHAIN_OUT_DATA, JSON.stringify(currentData));

        const storedData = sessionStorage.getItem(ON_CHAIN_OUT_DATA);

        const dataChanged = JSON.stringify(currentData) !== JSON.stringify(storedData);
        
        if (dataChanged) {
            sessionStorage.setItem(ON_CHAIN_OUT_DATA, JSON.stringify(currentData));
        }



    } catch(e:any) {

    }


}

const getSerializedOnChainInData = () => {

    const onChainInData = JSON.parse(sessionStorage.getItem(ON_CHAIN_IN_DATA) ?? '{}');
    
    return onChainInData.map((item:any)=>({
        tx:item.tx,
        amount: parseFloat(item.amount),
    }))
    
}


export const getOnChainOutData = async () => {

    const request = await http.get('/on-chain/history/out', {
        withCredentials: true,
    });

    try {
        

        const onChainInData = getSerializedOnChainInData();
        const onChainOut = request.data.onchainLogs;
        const stringUserData = sessionStorage.getItem(USER_DATA);
        
        if(stringUserData && onChainOut) {

            const userData: UserData = JSON.parse(stringUserData);
           
            const walletAddress = userData?.wallets.evm;
    
            const data = onChainOut.map((item:any) => {
    
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
    
                usdAmount: inputValue ?? getOnChainOutValue(parseFloat(parseFloat(item.value).toFixed(2)), item.inputCoin),
                brlaAmount: getOnChainOutValue(parseFloat(parseFloat(item.value).toFixed(2)), item.outputCoin),
    
                inputValue: formatNumberToString(inputValue ?? getOnChainOutValue(parseFloat(parseFloat(item.value).toFixed(2)), item.inputCoin)) + ' ' + item.inputCoin,
                outputValue: formatNumberToString(getOnChainOutValue(parseFloat(item.value), item.outputCoin)) + ' ' + item.outputCoin,
              
                
                amount: parseFloat(getOnChainOutValue(parseFloat(item.value),item.outputCoin).toFixed(2)),
                
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
                tx: txs[0]
                
    
            }});
            

             
            return data;

        }
        

        

    } catch(e:any) {
        throw new Error('Erro ao pegar dados de onChain: ', e.message || e.data?.message);
    }

}

function getOnChainOutValue (value:number,coin:string) {

    switch(coin) {
        
        case 'USDT':
        case 'USDC':
            return (parseFloat((value / USDTC_ON_CHAIN).toFixed(2)));
        default:
            return value;

    }

}



