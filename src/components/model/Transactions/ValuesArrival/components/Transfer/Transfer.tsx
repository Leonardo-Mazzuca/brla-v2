import { ReactNode, useEffect, useState } from "react";
import { controlColor, controlTextComponent, controlTransferAmount } from "../../../../../../service/TransactionsMapService/transfer/TransferComponentService";
import DefaultTemplate from "../DefaultTemplate/DefaultTemplate";
import { TransactionData } from "../../transactionsMap";
import { ExpectedPayoutData } from "../../../../../../controller/ValuesListingController/getPayoutData";
import { TEXT_GREEN_700 } from "../../../../../../contants/classnames/classnames";

const Transfer = ({ data }: TransactionData<ExpectedPayoutData | any>) => {


    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState<ReactNode>();
    const [taxId, setTaxId] = useState("");
    const [text, setText] = useState("Transferência feita para ");
    const [color, setColor] = useState(TEXT_GREEN_700);
  
    const numberAmount = data.amount;
  
    useEffect(()=> {
      
      controlTransferAmount(numberAmount, setAmount, data);
      
  
    },[data, setAmount, numberAmount])
  
    useEffect(() => {
  
      controlTextComponent(setTitle, setText, setTaxId, data);
  
    }, [data,setTaxId,setText]);
    
  
    useEffect(() => {
  
      controlColor(setColor, data);
  
    },[color,data]);
  
   
    return (
  
      <DefaultTemplate
        icon={data.icon}
        title={title}
        date={data.createdAt}
        
        amount={
          <p className={color}>{amount}</p>
        }
  
        footerText={text}
        addressNumber={taxId}
        operationName={data.operationName}
  
      />
  
    );
  
  };

  export default Transfer;