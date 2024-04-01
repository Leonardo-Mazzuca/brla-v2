import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { http } from "../ConectAPI/conectApi";




export const getOnChainData = async () => {

    try {

        const request = await http.get('/on-chain/history/out', {
            withCredentials: true,
        });


        const data = request.data.onchainLogs.map((item:any) => ({

            id: item.id,
            coin: item.outputCoin,
            from: item.from,
        
            accountNumber: item.to,
            title: item.chain,
            amount: (parseFloat(item.value) / 10000),

            operationName: item. smartContractOps.reduce((acc: string, op: any) => {
                acc = op.OperationName;
                return acc;
            }, ''),
            feedback: item. smartContractOps.reduce((acc: string, op: any) => {
                acc = op.feedback;
                return acc;
            }, []),
            createdAt: item.createdAt,
            icon: faArrowUp,

        }));
        
        return data;
        

    } catch(e:any) {
        throw new Error('Erro ao pegar dados de onChain: ', e.message || e.data?.message);
    }

}