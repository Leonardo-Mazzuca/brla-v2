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

const Receive = ({ data }: TransactionData<ExpectedPayInData>) => {
  
  const amount = data.amount ?? 0;

  return (

    <DefaultTemplate
      icon={data.icon}
      title={data.title}
      date={data.createdAt}
      amount={<p
        className={"bg-green-400/50 rounded-xl p-2"}         
      >
      {`+ BRLA ${amount}`}

      </p>}
      footerText={`Valor recebido de`}
      addressNumber={data.walletAddress}
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

  const numberAmount = data.transfers?.amount ?? 0;
  const formattedAmount = formatNumberToString(numberAmount) + " " + data.outputCoin;


  useEffect(() => {

    controlTextComponent(setTitle, setText, setTaxId, data);

  }, [data]);

  useEffect(()=> {

    controlTransferAmount(formattedAmount, setAmount, data)

  },[data, numberAmount, setAmount])
  

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

const Swap = ({ data }: TransactionData<any>) => {

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

  const choseCoin = isUsdToBrla(state.sendCurrency, state.receiveCurrency) ? data.outputCoin : 'BRLA'

  const brlaAmount = choseCoin + " " + formatNumberToString(data.brlaAmount);
  
  const usdAmount = data.outputCoin + " " + formatNumberToString(data.usdAmount);

  useEffect(() => {
    
    controlSwapPending(success, data, setPending, setSuccess);

    controlSwapTextComponent(pending, success, isPaymentSwap, data, setMessage);

    controlAmount(success, setAmount, isPaymentSwap, brlaAmount, usdAmount, usdToBrla);

    if (data.isPayment) {
      setIsPaymentSwap(true);
    }

    if(data.usdToBrla) {
      setIsUsdToBrla(true);
    }

  }, [success, message, isPaymentSwap, usdToBrla]);


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
      return <Receive data={data} />;

    case "BURN":
    case "BATCH-PERMIT":
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


