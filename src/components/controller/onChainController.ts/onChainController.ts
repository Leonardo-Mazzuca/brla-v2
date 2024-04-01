import { http } from "../ConectAPI/conectApi"



export const onChainController = async (chain: string, to: 
    string,inputCoin: string,outputCoin: string, value: number) => {

    try {

        const body = {chain, to, inputCoin, outputCoin, value,}

        const request = await http.post('/on-chain/transfer', body, {
            withCredentials: true
        });

        await request.data;
        
    } catch(e:any) {

        throw new Error('Erro ao criar ordem de transferencia: ', e.message)

    }
}