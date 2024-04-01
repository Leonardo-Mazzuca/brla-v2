import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { http } from "../ConectAPI/conectApi";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Feedback } from "../../types/Feedback/Feedback";

export type PayinData = {

    createdAt: string;
    payerName: string;
    chain: string;
    taxId: string;
    operationName: string;
    amount: number;
    id: string;
    icon: IconProp;
    coin: string;

}

export type ExpectedPayInData = {

    createdAt: string;
    payerName: string;
    title: string;
    taxId: string;
    operationName: string;
    amount: number;
    id: string;
    icon: IconProp;
    feedback : Feedback;
    
}



export async function getPayInData() {

    try {
        const request = await http.get('/pay-in/pix/history', {
            withCredentials: true
        });

        const data = request.data.depositsLogs.map((item: any) => {

            const { createdAt, payerName, taxId, chain } = item;
            const operationName = item.mintOps.reduce((acc: string, op: any) => {
                op.smartContractOps.forEach((sm: any) => acc = sm.operationName);
                return acc;
            }, '');

            const title = payerName;
            const icon = faPlus;
            const smartContractOps = item.mintOps[0].smartContractOps;
            let { amount, id } = item.mintOps[0];
            amount /= 100;
            const feedback = smartContractOps[0].feedback;
            

            return {

                createdAt,
                title,
                chain,
                taxId,
                operationName,
                amount,
                id,
                icon,
                feedback,

            };
            
        });

        return data;

    } catch (e: any) {
        
        throw new Error("Erro ao pegar dados de recebimento: ", e.data?.message || e.message);
       

    }
}
