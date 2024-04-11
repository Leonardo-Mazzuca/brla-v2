import { http } from "../ConectAPI/conectApi";

export async function validateUserController (email: string, token: string) {


    const body = {email, token};
    
    try {

        const response = await http.patch('/validate', body, {
          headers: {accept: 'application/json', 'content-type': 'application/json'},
        });
  
        return response;
  
      } catch (error: any) {
  

        return error.response?.data || error.message;
        
      }

}