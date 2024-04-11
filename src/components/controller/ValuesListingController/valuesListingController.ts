import formatDate from "../../service/Formatters/FormatDate/formatDate";
import { getOnChainInData } from "../onChainController.ts/getOnChainInData";
import { getOnChainOutData } from "../onChainController.ts/getOnChainOutData";
import { getConversionData } from "./getConversionData";
import { getPayInData } from "./getPayInData";
import { getPayOutOfBRCodeData } from "./getPayOutOfBRCodeData";
import { getPaymentData } from "./getPaymentData";
import { getPayoutData } from "./getPayoutData";
import { getPixToUsdData } from "./getPixToUsddata";


export async function valuesListingController(): Promise<any[]> {

    try {

        const payInData = await getPayInData();
        const payOutData = await getPayoutData();
        const convertData = await getConversionData(); 
        const paymentData = await getPaymentData();
        const onChainOutData = await getOnChainOutData();
        const onChainInData = await getOnChainInData();
        // const payOutUsingBrCodeData = await getPayOutOfBRCodeData();
        // await getPixToUsdData();
        
        let data: any[] = [];

        if (payInData && payOutData && convertData && paymentData && onChainOutData && onChainInData) {

            data = [...payInData, ...payOutData, ...convertData, 
                ...paymentData, ...onChainOutData, ...onChainInData,];
                
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

