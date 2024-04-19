import { http } from "../ConectAPI/conectApi";


export async function getWebSocketToken() {

    try {

        const request = await http.post('/websocket-token',{}, {
            withCredentials: true,
            headers: {
                "MAINTENANCE-TOKEN": "BRLAISTHEWAY"
            }
        });

        return request.data.token;

    } catch(e:any) {

        console.error(e.message);
        return false;

    }
    
}