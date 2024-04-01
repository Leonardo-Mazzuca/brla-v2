import { TransactionsState } from "../../context/TransactionsContext";
import * as XLSX from 'xlsx';

export default function exportData(state: TransactionsState) {
    
    const formattedData = state.data.map(item => {

        return {

            createdAt: item.createdAt,
            title: item.title || null,
            operationName: item.operationName || null,
            amount: item.transfers ? item.transfers.amount : item.ops ? item.ops.amount : null,
            recipient: item.operationName === 'MINT' ? item.taxId : item.transfers ? item.transfers.accountNumber : item.userDocument,
            brlaAmount: item.operationName === 'SWAP' ? item.brlaAmount : null,
            usdAmount: item.operationName === 'SWAP' ? item.usdAmount : null
        };

    });


    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);


    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

    const wbout = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
