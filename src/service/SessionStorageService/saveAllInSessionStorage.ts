import { FEES,  PAYMENT_DATA, PAY_IN_DATA, PAY_OUT_DATA, SERIALIZED_ON_CHAIN_OUT_DATA, SWAP_DATA, USER_DATA, WEB_SOCKET_CONNECTED } from "../../contants/sessionStorageKeys/sessionStorageKeys";
import { getBaseFee } from "../../controller/FeeController/getBaseFee";
import { getUserData } from "../../controller/UserDataController/getUserData"
import { getConversionData } from "../../controller/ValuesListingController/getConversionData";
import { getPayInData } from "../../controller/ValuesListingController/getPayInData";
import { getPaymentData } from "../../controller/ValuesListingController/getPaymentData";
import { getPayoutData } from "../../controller/ValuesListingController/getPayoutData";
import { saveOnChainInData } from "../../controller/onChainController.ts/getOnChainInData";
import { getOnChainOutData, saveOnChainOutData } from "../../controller/onChainController.ts/getOnChainOutData";




export const saveUserData = async () => {

    try {

        const userData = await getUserData()
        sessionStorage.setItem(USER_DATA, JSON.stringify(userData));


    } catch(e:any) {

    }

}

export const savePaymentData = async () => {

    
    const paymentData = await getPaymentData();
    sessionStorage.setItem(PAYMENT_DATA, JSON.stringify(paymentData));

}

export const saveSwapData = async () => {

    const swapData = await getConversionData();
    sessionStorage.setItem(SWAP_DATA, JSON.stringify(swapData));

}

export const savePayInData = async () => {
    
    const payInData = await getPayInData();
    sessionStorage.setItem(PAY_IN_DATA, JSON.stringify(payInData));
}   

export const savePayOutData = async () => {
    

    const payOutData = await getPayoutData();
    sessionStorage.setItem(PAY_OUT_DATA, JSON.stringify(payOutData));
}   

export const saveOnChainOutSerializedData = async () => {
    

    const onChainOutData = await getOnChainOutData();
    sessionStorage.setItem(SERIALIZED_ON_CHAIN_OUT_DATA, JSON.stringify(onChainOutData));
}   

export const saveTransactionsData = async () => {

    try {

        
        await Promise.all([
            saveSwapData(),
            savePaymentData(),
           ,saveOnChainOutData(),
           ,savePayInData(), 
           savePayOutData(),
           saveOnChainInData()
        ]);

             
    
   

    } catch(e:any) {

    }

}

export const saveFeeData = async () => {

    try {

        const fees = await getBaseFee();
        sessionStorage.setItem(FEES, JSON.stringify(fees));

    } catch(e:any) {



    }



}



