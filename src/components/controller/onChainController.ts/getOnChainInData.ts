import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { formatWalletAddress } from "../../service/Formatters/FormatWalletAddress/formatWalletAddress";
import { http } from "../ConectAPI/conectApi";
import { ExpectedConversionData, getConversionData } from "../ValuesListingController/getConversionData";
import formatDate from "../../service/Formatters/FormatDate/formatDate";


type ExpectedOnChainInData = {

    fromAddress: string;
    toAddress: string;
    amount: string;
    createdAt: string;
    chain: string;
    tx:string;
    id: string

}

export const getOnChainInData =  async () => {

    try {

        const request = await http.get('/on-chain/history/in', {
            withCredentials: true,
        });
        
        const conversionData = await getConversionData();

        
        
        const data = request.data.onchainLogs.map((item: ExpectedOnChainInData) => {

            const tx = conversionData.filter((data: ExpectedConversionData) => item.tx !== data.tx)[0];
            
            
            return {

            operationName: tx ? '' : 'MINT',
            walletAddress: formatWalletAddress(item.fromAddress),
            amount: parseFloat(item.amount),
            date: formatDate(item.createdAt),
            createdAt: tx ? '' : item.createdAt,
            title: item.chain,
            icon: faPlus,
            tx: item.tx,
            id: item.id,
        

        }});

        console.log(data);
        

        
        
        return data;
        

    } catch(e:any) {

        throw new Error("Erro ao pegar dados de onChain in: ", e.message || e.data?.message);

    }

}