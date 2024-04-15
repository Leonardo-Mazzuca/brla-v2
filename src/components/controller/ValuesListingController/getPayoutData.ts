import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { http } from "../ConectAPI/conectApi";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Feedback } from "../../types/Feedback/Feedback";
import { formatWalletAddress } from "../../service/Formatters/FormatWalletAddress/formatWalletAddress";
import { formatInTaxId } from "../../service/TaxId/FormatInTaxId/formatInTaxId";
import formatDate from "../../service/Formatters/FormatDate/formatDate";
import { TO_WEBSOCKET } from "../../contants/divisionValues/divisionValues";
import { PAY_OUT_DATA } from "../../contants/sessionStorageKeys/sessionStorageKeys";

type SmartContractOps = {
    operationName: string;
    feedback: any;
}

type Transfers = {
    amount: number;
    id: string;
    accountNumber: string;
    feedbacks: Feedback[];
    name: string;
    taxId: string;
    
}

type ExpectedTransfers = {
    amount: string;
    id: string;
    accountNumber: string;
    feedbacks: Feedback;
    title: string;
}

export type PayoutData = {
    createdAt: string;
    transfers: Transfers[];
    smartContractOps: SmartContractOps[];
    amount: number;
    id: string;
    accountNumber: string;
    feedbacks: any[];
    name: string;
    icon: IconProp;
    fee: number;
    chain: string;
    walletAddress: string;

}

export type ExpectedPayoutData = {
    createdAt: string;
    transfers: ExpectedTransfers;
    operationName: string;
    icon: IconProp;
    message: string;
    feedback: Feedback
}

export async function getPayoutData() {

    try {
        
        const request = await http.get('/pay-out/history', { withCredentials: true });
    
        
        
        const data = request.data.transfersLogs.map((item: PayoutData) => {
        
                const latestFeedback = item?.transfers?.flatMap((transfer: any) => transfer?.feedbacks)
                    .reduce((latest: any, feedback: any) => {
                        

                        const date = new Date(feedback?.updatedAt);

                        if (!latest.date || date > latest.date) {

                            return { 
                                date, 
                                feedback
                             };

                        }

                        return latest;

                    }, { date: null, feedback: null }).feedback;

            
            
                const feedback = {

                    success: latestFeedback?.logType ?  latestFeedback.logType === 'success' : null,
                    updatedAt: latestFeedback?.updatedAt ? latestFeedback.updatedAt : '...',

                } ?? {};

            
            
        return {

            createdAt: item.createdAt,
           
            title: item.chain,

            operationName: 'BURN',

            feedback : feedback,
            
            icon: faArrowUp,

            transfers: {

                taxId: item.transfers?.reduce((acc: string, op: Transfers) => {
                    acc = formatInTaxId(op.taxId);
                    return acc;
                }, '...'),

            },

            amount: item.amount / TO_WEBSOCKET,

            accountNumber: formatWalletAddress(item.walletAddress),

            outputCoin: 'BRL',
      

        }});

  
        
        sessionStorage.setItem(PAY_OUT_DATA, JSON.stringify(data));
        
        return data;
        
    } catch (e: any) {

        console.log(e.data?.message || e.message);
        throw new Error("Erro ao pegar dados de transferencia: " + (e.data?.message || e.message));
    }
}