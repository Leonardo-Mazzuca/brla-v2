
import { FormState } from "../../../../../context/Register/FormContext";
import { http } from "../../../../../controller/ConectAPI/conectApi";



export async function registerUser (data:FormState) {


    const body = { ...data };

    try {

      const response = await http.post('/create', body);

      return response;


    } catch (error: any) {

      console.error('Error during register:', error.response?.data || error.message);
      
    }

}
