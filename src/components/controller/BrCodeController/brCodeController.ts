import { http } from "../ConectAPI/conectApi"




export async function brCodeController () {



    try {

        const request = await http.get('/info',{
            withCredentials: true
        });
    
        
        return request.data.brCode;

    } catch(e: any) {

        return false;

    }



}

