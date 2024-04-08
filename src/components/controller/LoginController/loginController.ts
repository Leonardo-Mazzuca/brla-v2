
import { http } from "../ConectAPI/conectApi";


export async function loginController(email: string, password: string) {


    const body = { email, password };
    
    try {

      const request = await http.post('/login', body, {
        withCredentials: true 
      })

      return request;

    } catch (error: any) {
      
      
        throw new Error('Erro ao fazer a requisição: ' + error.message);
      
      
      
    }

    
    
  }