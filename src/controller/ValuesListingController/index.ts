
import { TRANSACTIONS_DATA } from "../../contants/sessionStorageKeys/sessionStorageKeys";
import formatDate from "../../functions/Formatters/FormatDate/formatDate";

import { getOnChainInData } from "../onChainController.ts/getOnChainInData";
import { getOnChainOutData } from "../onChainController.ts/getOnChainOutData";
import { getConversionData } from "./getConversionData";
import { getPayInData } from "./getPayInData";
import { getPaymentData } from "./getPaymentData";
import { getPayoutData } from "./getPayoutData";

export async function valuesListingController() {

    try {

        let currentData: any[] = await Promise.all([

            getPayInData(),
            getPayoutData(),
            getConversionData(),
            getPaymentData(),
            getOnChainOutData(),
     
        ]);


        let onChainIn = await getOnChainInData();
        currentData.push(onChainIn);

      
        currentData = currentData.flat();
        currentData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        currentData.forEach(item => {
            item.createdAt = formatDate(item.createdAt);
        });
        
        sessionStorage.setItem(TRANSACTIONS_DATA, JSON.stringify(currentData));

        
        const storedDataString = sessionStorage.getItem(TRANSACTIONS_DATA);
        const storedData = storedDataString ? JSON.parse(storedDataString) : [];

      
        const dataChanged = JSON.stringify(currentData) !== JSON.stringify(storedData);

        if (dataChanged) {
            sessionStorage.setItem(TRANSACTIONS_DATA, JSON.stringify(currentData));
        }

        
        
        return currentData;

    } catch (error: any) {
        throw new Error("Erro ao concatenar dados de listagem de valores: " + (error.message || error.data?.message));
    }

}
