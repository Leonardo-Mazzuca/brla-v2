import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { http } from "../ConectAPI/conectApi";
import { formatInTaxId } from "../../service/TaxId/FormatInTaxId/formatInTaxId";
import { TO_WEBSOCKET } from "../../contants/divisionValues/divisionValues";


export async function getPaymentData() {
    try {
        const request = await http.get('/payment/history', {
            withCredentials: true,
        });
        
        

        const data = request.data.paymentLogs.map((item: any) => {
            const latestFeedback = item.paymentOps
                .flatMap((paymentOp: any) => paymentOp?.transfers ?? []) 
                .flatMap((transfer: any) => transfer?.feedbacks ?? []) 
                .reduce((latest: any, feedback: any) => {
                    const date = new Date(feedback.updatedAt);

                    if (!latest.date || date > latest.date) {
                        return { date, feedback };
                    }

                    return latest;
                }, { date: null, feedback: null }).feedback;

            const feedback = {
                success: latestFeedback?.logType ? latestFeedback.logType === 'success' : null,
                updatedAt: latestFeedback?.updatedAt ?? '...', 
            };

            return {

                baseFee: item.baseFee,
                brlaAmount: item.brlaAmount / TO_WEBSOCKET,
                title: item.chain,
                usdAmount: item.usdAmount / TO_WEBSOCKET,
                createdAt: item.createdAt,
                inputCoin: item.coin,
                outputCoin: 'BRLA',
                operationName: 'BURN',
                feedback: feedback,
                status: item.status,
                taxId: formatInTaxId(item.userTaxId),
                icon: faArrowUp,
                isPayment: true,
                usdToBrla: true,
                transfers: {

                    amount: item.brlaAmount / TO_WEBSOCKET,
                    taxId: formatInTaxId(item.userTaxId),
                    
                },

                amount: item.brlaAmount / TO_WEBSOCKET,

            };

        });
        
        return data;
        
    } catch (e: any) {
        throw new Error('Erro ao pegar dados de pix-to-usd: ' + (e.data?.message || e.message));
    }
}
