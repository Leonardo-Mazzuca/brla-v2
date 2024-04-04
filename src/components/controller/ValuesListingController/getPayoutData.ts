import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { http } from "../ConectAPI/conectApi";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Feedback } from "../../types/Feedback/Feedback";
import { formatWalletAddress } from "../../service/Formatters/FormatWalletAddress/formatWalletAddress";
import { formatInTaxId } from "../../service/TaxId/FormatInTaxId/formatInTaxId";

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
}

export async function getPayoutData() {

    try {
        const request = await http.get('/pay-out/history', { withCredentials: true });

        console.log('Default payout data: ', request.data.transfersLogs);
        
        const data = request.data.transfersLogs.map((item: PayoutData) => {

        

                // const feedback = item.transfers?.map((transfer: any) => {
    
                    
                    
                // }).flat();
        
                if(item.transfers !== null) {

                    const feedback = item.transfers[0].feedbacks.map((feedback: Feedback)=> {
            
                        console.log(
                            feedback);
                        
                    });

                }

            
            
        return {

            createdAt: item.createdAt,
           
            title: item.chain,

            operationName: item.smartContractOps.reduce((acc: string, op: SmartContractOps) => {
                acc = op.operationName;
                return acc;
            }, ''),

            // feedback : item.transfers.map((transfer: any) => {
            //     return transfer.feedbacks.map((feedbackItem: any) => {
            //         return feedbackItem.feedback;
            //     });
            // }).flat(),
            
            icon: faArrowUp,

            transfers: {

                taxId: item.transfers?.reduce((acc: string, op: Transfers) => {
                    acc = formatInTaxId(op.taxId);
                    return acc;
                }, '...'),

                amount: item.transfers?.reduce((acc: number, op: Transfers) => {
                    return acc + (op.amount / 100); 
                }, 0) ?? 0,

            },


            accountNumber: formatWalletAddress(item.walletAddress),
      

        }});
          
        
        return data;
        
    } catch (e: any) {

        console.log(e.data?.message || e.message);
        throw new Error("Erro ao pegar dados de transferencia: " + (e.data?.message || e.message));
    }
}