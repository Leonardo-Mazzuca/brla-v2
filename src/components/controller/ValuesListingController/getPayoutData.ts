import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { http } from "../ConectAPI/conectApi";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Feedback } from "../../types/Feedback/Feedback";

type SmartContractOps = {
    operationName: string;
    feedback: any;
}

type Transfers = {
    amount: number;
    id: string;
    accountNumber: string;
    feedbacks: any;
    name: string;
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
        
        if (!request.data.transfersLogs) {
            return [{
                message: 'Aguardando dados...',
            }];
        }

        // console.log('Transfer default request: ' , request.data.transfersLogs);
        
        
        const data = request.data.transfersLogs.map((item: PayoutData) => ({

            createdAt: item.createdAt,
            amount: (item.amount - item.fee) / 100,
            title: item.chain,
            operationName: item.smartContractOps.reduce((acc: string, op: SmartContractOps) => {
                acc = op.operationName;
                return acc;
            }, ''),

            feedback: item.smartContractOps.reduce((acc: any, op: SmartContractOps) => {
                acc = op.feedback;
                return acc;
            }, []),
            
            icon: faArrowUp,
            accountNumber: item.walletAddress,

        }));
        
        return data;
        
    } catch (e: any) {

        console.log(e.data?.message || e.message);
        throw new Error("Erro ao pegar dados de transferencia: " + (e.data?.message || e.message));
    }
}
