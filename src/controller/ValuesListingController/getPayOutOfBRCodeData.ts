

import { TO_WEBSOCKET } from "../../contants/divisionValues/divisionValues";
import { formatWalletAddress } from "../../functions/Formatters/FormatWalletAddress/formatWalletAddress";

import { http } from "../ConectAPI/conectApi";



export const getPayOutOfBRCodeData = async () => {



    try {

        const request = await http.get('/pay-out/br-code/history', {
            withCredentials: true
        });

        
        const data = request.data.brCodePaymentsLogs.map((item:any)=> ({

            createdAt: item.createdAt,
            title: item.chain,
            operationName: item.smartContractOps.reduce((acc: string, op: any) => {
                acc = op.operationName;
                return acc;
            }, ''),
            transfers: {

                amount: (item.amount - item.fee) / TO_WEBSOCKET,
                taxId: formatWalletAddress(item.walletAddress),

            }



        }));
        
        return data;
            


    } catch(e:any) {
        throw new Error('Erro ao mapear dados de payout com BRCode: ', e.message || e.data?.message);
    }
}