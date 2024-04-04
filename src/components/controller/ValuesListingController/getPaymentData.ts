import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { http } from "../ConectAPI/conectApi"
import { formatInTaxId } from "../../service/TaxId/FormatInTaxId/formatInTaxId";





export async function getPaymentData () {


    try {
        
        const request = await http.get('/payment/history', {
            withCredentials: true,
        });

        

        const data = request.data.paymentLogs.map((item: any)=> ({

            baseFee: item.baseFee,
            brlaAmount: item.brlaAmount / 100,
            title: item.chain,
            usdAmount: item.usdAmount / 100,
            createdAt: item.createdAt,
            coin: item.coin,
            
            operationName: item.paymentOps.map((op: any) => {
             
                const latestDate = op.smartContractOps.reduce((latest: string, curr: any) => {
                    
                    const currentOpDate = new Date(curr.createdAt);
                    const latestOpDate = new Date(latest);
                    return currentOpDate > latestOpDate ? curr.createdAt : latest;

                }, op.smartContractOps[0].createdAt);
            

                const latestOp = op.smartContractOps.find((op: any) => op.createdAt === latestDate);
                return latestOp?.operationName
                
            })[0],

            feedback: item.paymentOps.map((op:any)=> 
            op.smartContractOps.reduce((acc: string, op: any) => {
                acc = op.feedback;
                return acc;
            }, {}))[0],
            
            status: item.status,
            taxId: formatInTaxId(item.userTaxId),
            icon: faArrowUp,
            isPayment: true,
            usdToBrla: true,
            amount: item.brlaAmount / 100,


        }));

        
        return data;
        
    } catch(e:any) {
        throw new Error('Erro ao pegar dados de pix-to-usd: ', e.message)
    }
    
}