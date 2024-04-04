import { formatWalletAddress } from "../../service/Formatters/FormatWalletAddress/formatWalletAddress";
import { http } from "../ConectAPI/conectApi";


type ExpectedOnChainInData = {

    fromAddress: string;
    amount: string;
    createdAt: string;
    chain: string;

}

export const getOnChainInData =  async () => {

    try {

        const request = await http.get('/on-chain/history/in', {
            withCredentials: true,
        });
        
        console.log(request.data.onchainLogs);
    
        
      const data = request.data.onchainLogs.map((item: ExpectedOnChainInData) => ({

            opperationName: 'MINT',
            walletAddress: formatWalletAddress(item.fromAddress),
            amount: parseFloat(item.amount),
            createdAt: item.createdAt,
            title: item.chain


        }));

        return data;
        

    } catch(e:any) {

        throw new Error("Erro ao pegar dados de onChain in: ", e.message || e.data?.message);

    }

}