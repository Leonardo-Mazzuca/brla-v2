import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextModel from "../../Text/Text";
import { formatNumberToString } from "../../../service/Formatters/FormatNumber/formatNumber";

import { ReactNode, useEffect, useState } from "react";
import { ExpectedPayoutData } from "../../../controller/ValuesListingController/getPayoutData";
import { ExpectedPayInData } from "../../../controller/ValuesListingController/getPayInData";
import { controlAmount, controlSwapPending, controlSwapTextComponent } from "../../../service/TransactionsMapService/swap/SwapComponentService";
import { controlColor, controlTextComponent, controlTransferAmount } from "../../../service/TransactionsMapService/transfer/TransferComponentService";
import { useCurrency } from "../../../context/CurrencyContext";
import { isUsdToBrla } from "../../../service/Util/isUsdToBrla";
import { FONT_BOLD, MARGIN_Y_3, TEXT_CENTER, TEXT_GRAY_400, TEXT_GRAY_500, TEXT_GRAY_700, TEXT_GREEN_700, TEXT_RED_600, TEXT_XL, WIDTH_AUTO } from "../../../contants/classnames/classnames";
import { isOnChain } from "../../../service/WebSocketService/WebSocketConstraints/webSocketContrainst";


export type TransactionData<T> = {
  data: T;
};

const DefaultTemplate = ({

  icon,
  title,
  date,
  amount,
  footerText,
  addressNumber,

}: any) => (
  
  <div className="w-full flex flex-col">

    <article className="flex justify-between flex-col xl:flex-row">


      <div className="flex items-center justify-between gap-5">
        <div style={{borderRadius: '100%'}} className="flex items-center justify-center border border-black text-md h-[40px] text-center w-[40px]">
          <FontAwesomeIcon icon={icon} />
        </div>

        <div className="xl:text-start text-end">
          <TextModel size="text-xl" color={TEXT_GRAY_700} content={title} />
          <TextModel color={TEXT_GRAY_400} content={date} />
        </div>

      </div>

      <div className="flex items-end flex-col justify-between flex-wrap">

        <TextModel
          size={TEXT_XL}
          weight={FONT_BOLD}
          addons={`${WIDTH_AUTO} ${MARGIN_Y_3} ${TEXT_GREEN_700}`}
          content={amount}
        />

        <TextModel
          addons={`${TEXT_CENTER} md:text-end`}
          content={`${footerText} ${addressNumber}`}
        />

      </div>

    </article>

    <hr className="mt-10" />

  </div>
);

const Receive = ({ data }: TransactionData<ExpectedPayInData | any>) => {
  
  const amount = formatNumberToString(data.amount) ?? 0;

  return (

    <DefaultTemplate
      icon={data.icon}
      title={data.title}
      date={data.createdAt}
      amount={<p
        className={"bg-green-400/50 rounded-xl p-2"}         
      >
      {`+ ${amount} BRL`}

      </p>}
      footerText={`Valor recebido de`}
      addressNumber={data.walletAddress || data.transfers?.taxId}
      operationName={data.operationName}

    />

  );

};

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

export const TransactionMap: React.FC<TransactionData<any>> = ({ data }) => {
  if (!data) {
    return <p>Sem dados no momento</p>;
  }

  switch (data.operationName) {

    case "MINT":
    case "BATCH-PERMIT":
      return <Receive data={data} />;

    case "BURN":
    case "TRANSFER-WITH-PERMIT":
      return <Transfer data={data} />;

    case "SWAP":
    case "CONVERT-USD":
    case "PARTIAL-BRLA-SWAP":
    case "PARTIAL-BRLA-SWAP":
      return <Swap data={data} />;


    default:
      return null;
  }
};