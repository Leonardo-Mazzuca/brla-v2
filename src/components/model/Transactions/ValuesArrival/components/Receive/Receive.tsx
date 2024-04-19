import { ExpectedPayInData } from "../../../../../../controller/ValuesListingController/getPayInData";
import { formatNumberToString } from "../../../../../../functions/Formatters/FormatNumber/formatNumber";
import { TransactionData } from "../../transactionsMap";

import DefaultTemplate from "../DefaultTemplate/DefaultTemplate";


export const Receive = ({ data }: TransactionData<ExpectedPayInData | any>) => {
  
    const amount = formatNumberToString(data.amount) ?? 0;
  
    return (
  
      <DefaultTemplate
        icon={data.icon}
        title={data.title}
        date={data.createdAt}
        amount={<p
          className={"bg-green-400/50 rounded-xl p-2"}         
        >
        {`+ ${amount} ${data.coin ? data.coin : 'BRL'}`}
  
        </p>}
        footerText={`Valor recebido de`}
        addressNumber={data.walletAddress || data.transfers?.taxId}
        operationName={data.operationName}
  
      />
  
    );
  
  };
