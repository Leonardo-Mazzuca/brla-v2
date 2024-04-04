

import { formatWalletAddress } from "../../service/Formatters/FormatWalletAddress/formatWalletAddress";
import { http } from "../ConectAPI/conectApi";



export const getPayOutOfBRCodeData = async () => {



    try {

        const request = await http.get('/pay-out/br-code/history', {
            withCredentials: true
        });

        console.log('BR code default data: ', request.data.brCodePaymentsLogs);
        
        const data = request.data.brCodePaymentsLogs.map((item:any)=> ({

            createdAt: item.createdAt,
            title: item.chain,
            operationName: item.smartContractOps.reduce((acc: string, op: any) => {
                acc = op.operationName;
                return acc;
            }, ''),
            transfers: {

                amount: (item.amount - item.fee) / 100,
                taxId: formatWalletAddress(item.walletAddress),

            }



        }));
        
        return data;
            


    } catch(e:any) {
        throw new Error('Erro ao mapear dados de payout com BRCode: ', e.message || e.data?.message);
    }
}