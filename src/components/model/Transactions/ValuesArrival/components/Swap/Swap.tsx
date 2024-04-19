import { ReactNode, useEffect, useState } from "react";
import { controlAmount, controlSwapPending, controlSwapTextComponent } from "../../../../../../service/TransactionsMapService/swap/SwapComponentService";
import DefaultTemplate from "../DefaultTemplate/DefaultTemplate";

import { isUsdToBrla } from "../../../../../../Util/isUsdToBrla";
import { TEXT_GRAY_500, TEXT_GREEN_700, TEXT_RED_600 } from "../../../../../../contants/classnames/classnames";
import { useCurrency } from "../../../../../../context/Currency/CurrencyContext";
import { formatNumberToString } from "../../../../../../functions/Formatters/FormatNumber/formatNumber";


const Swap = ({ data }: any) => {

    const {state} = useCurrency();
    const [success, setSuccess] = useState<boolean | undefined>(data.feedback?.success);
    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState("");
    const [isPaymentSwap, setIsPaymentSwap] = useState(false);
    const [amount, setAmount] = useState<ReactNode>();
    const [usdToBrla, setIsUsdToBrla] = useState(false);
    const [textColor, setTextColor] = useState('');
  
    useEffect(()=> {
  
      if(pending) {
        setTextColor(TEXT_GRAY_500);
      } else if (success) {
        setTextColor(TEXT_GREEN_700);
      } else {
        setTextColor(TEXT_RED_600);
      }
  
    },[textColor, success, pending])
  
  
    useEffect(()=> {
  
      if (data.isPayment) {
  
        setIsPaymentSwap(true);
  
      }
  
      if(data.usdToBrla) {
  
        setIsUsdToBrla(true);
  
      }
  
      
  
    },[isPaymentSwap,usdToBrla,data])
  
    const choseCoin = isUsdToBrla(state) ? 'BRL' : 
    data.inputCoin === undefined ? 'BRL' : data.inputCoin
  
  
    const brlaAmount = data.isSwap ? formatNumberToString(data.brlaAmount)  +  " " + choseCoin :
    (isUsdToBrla(state) ? 
    formatNumberToString(data.usdAmount) :  formatNumberToString(data.brlaAmount))  +  " " + choseCoin;
    
    const usdAmount =  formatNumberToString(data.usdAmount) + " " + data.outputCoin;
    
    useEffect(() => {
  
      controlSwapPending(data, setPending, setSuccess);
  
  
    }, [data,setPending,setSuccess]);
  
    useEffect(()=> {
  
      controlSwapTextComponent(pending, success, isPaymentSwap, data, setMessage);
  
    },[pending,success, isPaymentSwap,data,setMessage]);
  
  
    useEffect(()=> {
  
      controlAmount(success, setAmount, isPaymentSwap, brlaAmount, usdAmount, usdToBrla, data)
  
    },[success,isPaymentSwap, brlaAmount,usdAmount,usdToBrla,data,setAmount]);
  
    return (
  
      <DefaultTemplate
        icon={data.icon}
        title={data?.title || ""}
        date={data.createdAt}
        amount={<p className={textColor}>{amount}</p>}
        footerText={message}
        addressNumber=""
        coin=""
        operationName={data.operationName}
      />
  
    );
  
  };
  

  export default Swap;