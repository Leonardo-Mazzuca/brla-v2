import { http } from "../ConectAPI/conectApi";


export const transferController = async (pixkey: string, taxId: string, amount: number) => {

    try {

        const body = {pixkey, taxId, amount}
        

        const request = await http.post('/pay-out', body, {
            withCredentials: true
        });
        
        if(request.status === 200) {
            return request.data;
        }
        
        
    } catch(e:any){

        throw new Error('Não é possível criar ordem de transferencia: ', e?.message);

    }
}