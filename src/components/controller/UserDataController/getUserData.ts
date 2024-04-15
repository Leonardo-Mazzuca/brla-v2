import { UserData } from "../../types/UserData/UserData";
import { http } from "../ConectAPI/conectApi";

export const getUserData = async (): Promise<UserData | undefined> => {

    try {
        
        const request = await http.get('/info', {
            withCredentials: true,
        });

        return request.data;
        
    } catch (e: any) {
        
        if(e) {
            window.location.href = '/';
        }

        throw new Error('Erro ao pegar dados do usuário: ', e.message || e.data?.message)

    }
};
