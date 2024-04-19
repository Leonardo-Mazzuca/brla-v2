
import { TO_CENTS } from "../../contants/divisionValues/divisionValues";
import { http } from "../ConectAPI/conectApi"



type FeeData = {
    
    brlaToUsdFee :number;
    pixOutFee : number; 
    thirdPartyPixInFee: number
    usdToBrlaFee : number;

}


export const getBaseFee = async ():Promise<FeeData> => {

    try {

        const request = await http.get('/fees',{
            withCredentials: true
        });

        const item = request.data;

        const newData: FeeData = {
            brlaToUsdFee: item.brlaToUsdFee / TO_CENTS,
            pixOutFee: item.pixOutFee / TO_CENTS,
            thirdPartyPixInFee: item.thirdPartyPixInFee / TO_CENTS,
            usdToBrlaFee: item.usdToBrlaFee / TO_CENTS,
        };

        return newData;
        

    } catch(e:any){
        throw new Error('Erro ao pegar fees: ', e.message || e.data?.message)
    }

}