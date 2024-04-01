import formatDate from "../../service/Formatters/FormatDate/formatDate";
import { getOnChainData } from "../onChainController.ts/getOnChainData";
import { getConversionData } from "./getConversionData";
import { getPayInData } from "./getPayInData";
import { getPaymentData } from "./getPaymentData";
import { getPayoutData } from "./getPayoutData";


export async function valuesListingController(): Promise<any[]> {

    try {

        const payInData = await getPayInData();
        const payOutData = await getPayoutData();
        const convertData = await getConversionData(); 
        const paymentData = await getPaymentData();
        const onChainData = await getOnChainData();

        
        let data: any[] = [];

        if (payInData && payOutData && convertData && paymentData && onChainData) {
            data = [...payInData, ...payOutData, ...convertData, ...paymentData, ...onChainData];
        }
        
        data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        data.forEach(item => {
            item.createdAt = formatDate(item.createdAt);
        });

    
        return data;
        
    } catch (e:any) {


        throw new Error("Erro ao concatenar dados de listagem de valores: ", e.message)

    }
}

