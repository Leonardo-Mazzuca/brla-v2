import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { http } from "../ConectAPI/conectApi";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Feedback } from "../../types/Feedback/Feedback";
import { getUserData } from "../UserDataController/getUserData";
import { TO_WEBSOCKET } from "../../contants/divisionValues/divisionValues";
import { SWAP_DATA, USER_DATA } from "../../contants/sessionStorageKeys/sessionStorageKeys";
import { UserData } from "../../types/UserData/UserData";


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
    baseFee: string;
   
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
    isSwap: boolean,
    receiverAddress: string;

}

export async function getConversionData () {

    try {

        const request = await http.get('/swap/history', {
            withCredentials: true
        });
        
        const stringData = sessionStorage.getItem(USER_DATA);
        

        if(stringData) {

            const userData : UserData = JSON.parse(stringData);
    
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
    
                usdAmount: (parseFloat(item.usdAmount) / TO_WEBSOCKET),
                brlaAmount: parseFloat(item.brlaAmount) / TO_WEBSOCKET,
                outputCoin: item.coin,
                userDocument: item.userDocument,
                title: item.chain,
                operationName: 'SWAP',
                basePrice: item.basePrice,
                usdToBrla: item.usdToBrla,
                icon: faArrowRightArrowLeft,
                isPayment: item.receiverAddress !== walletAddress,
                isSwap: true,
                receiverAddress: item.receiverAddress
               
                
                
                
            }));


            sessionStorage.setItem(SWAP_DATA, JSON.stringify(data));
         
            return data;

        }

    } catch(e: any) {

        throw new Error("Erro ao pegar dados de conversão: ", e.data?.message || e.message);
      
    }
}
