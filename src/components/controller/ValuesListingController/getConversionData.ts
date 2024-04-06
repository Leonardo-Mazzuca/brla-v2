import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { http } from "../ConectAPI/conectApi";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Feedback } from "../../types/Feedback/Feedback";
import { getUserData } from "../UserDataController/getUserData";


type SmartContractOps = {


    id: string;
    operationName: string;
    feedback: Feedback;
    tx: string;
 

}


export type ConversionData = {

    createdAt: string;
    smartContractOps: SmartContractOps[];
    brlaAmount: string;
    usdAmount: string;
    coin: string,
    userDocument: string,
    chain: string,
    usdToBrla: boolean;
    basePrice: string;
    icon: IconProp
    receiverAddress: string
    tx: string;
   
}

export type ExpectedConversionData = {

    createdAt: string;
    ops: SmartContractOps[];
    brlaAmount: string;
    usdAmount: string;
    coin: string,
    userDocument: string,
    title: string,
    usdToBrla: boolean;
    basePrice: string;
    icon: IconProp
    feedback: Feedback
    operationName: string;
    isPayment: boolean;
    tx: string;

}




export async function getConversionData () {

    try {

        const request = await http.get('/swap/history', {
            withCredentials: true
        });
        
        const userData = await getUserData();
        
        
        const walletAddress = userData?.wallets.evm;
        
        
        const data = request.data.swapLogs.map((item: ConversionData) => ({

            createdAt: item.createdAt,

            ops: item.smartContractOps.map((op: SmartContractOps) => ({
                id: op.id,
                feedback: {
                    ...op.feedback,
                    createdAt: item.createdAt 
                }
                
            })),

            tx: item.smartContractOps.reduce((acc: string, op: SmartContractOps) => {
                acc = op.tx;
                return acc;
            },''),

            feedback: item.smartContractOps.reduce((acc: Feedback, op: SmartContractOps) => {
                acc = op.feedback;
                return acc;
            }, {} as Feedback),

            usdAmount: parseFloat(item.usdAmount) / 100,
            brlaAmount: parseFloat(item.brlaAmount) / 100,
            outputCoin: item.coin,
            userDocument: item.userDocument,
            title: item.chain,
            operationName: item.smartContractOps.reduce((acc: string, op: SmartContractOps) => {
                acc = op.operationName;
                return acc;
            }, ''),
            
            basePrice: item.basePrice,
            usdToBrla: item.usdToBrla,
            icon: faArrowRightArrowLeft,
            isPayment: item.receiverAddress !== walletAddress,
           

            
        }));
        
        
        return data;

    } catch(e: any) {

        throw new Error("Erro ao pegar dados de conversão: ", e.data?.message || e.message);
      
    }
}
