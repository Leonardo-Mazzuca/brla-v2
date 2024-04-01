import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextModel from "../../Text/Text";
import { formatNumberToString } from "../../../service/Formatters/FormatNumber/formatNumberToString";
import { getCurrencyCoinToFormat } from "../../../service/CoinsService/getCurrencyCoinToFormat";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { ExpectedConversionData } from "../../../controller/ValuesListingController/getConversionData";
import { ExpectedPayoutData } from "../../../controller/ValuesListingController/getPayoutData";
import { ExpectedPayInData } from "../../../controller/ValuesListingController/getPayInData";
import { controlAmount, controlSwapPending, controlSwapTextComponent } from "../../../service/TransactionsMapService/swap/SwapComponentService";
import { controlColor, controlTextComponent, controlTransferAmount } from "../../../service/TransactionsMapService/transfer/TransferComponentService";


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
        <div className="border border-black rounded-full text-2xl py-5 px-6">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="xl:text-start text-end">
          <TextModel color="gray-700" content={title} />
          <TextModel color="gray-400" content={date} />
        </div>
      </div>
      <div className="flex xl:items-end items-center xl:flex-col items-center justify-between flex-wrap">

        <TextModel
          size="text-3xl"
          weight="font-bold"
          addons="w-auto my-3 ? text-green-700"
          content={amount}
        />
        <TextModel
          addons={`text-center md:text-end`}
          content={`${footerText} ${addressNumber}`}
        />

      </div>
    </article>

    <hr className="mt-10" />

  </div>
);

const Receive = ({ data }: TransactionData<ExpectedPayInData>) => {
  
  const amount = formatNumberToString(data.amount ?? 0, "USD");

  return (

    <DefaultTemplate
      icon={data.icon}
      title={data.title}
      date={data.createdAt}
      amount={<p
        className={"bg-green-400/50 rounded-xl p-2"}         
      >
      {`+ ${amount}`}
      </p>}
      footerText={`Valor recebido de`}
      addressNumber={data.taxId}
      operationName={data.operationName}

    />

  );

};

const Transfer = ({ data }: TransactionData<ExpectedPayoutData | any>) => {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<ReactNode>();
  const [accountNumber, setAccNumber] = useState("");
  const [text, setText] = useState("Transferência feita para ");
  const [color, setColor] = useState('text-green-700');

  const numberAmount = data.amount;
  const formattedAmount = formatNumberToString(numberAmount ,getCurrencyCoinToFormat(data.coin));

  useEffect(()=> {

  
    controlTransferAmount(formattedAmount, setAmount, data)

  },[data, formattedAmount, setAmount])
  

  
  useEffect(() => {

    controlTextComponent(setTitle, setText, setAccNumber, data);

  }, [data]);

  useEffect(() => {

    controlColor(setColor, amount, data)

  },[color]);

 


  return (

    <DefaultTemplate
      icon={data.icon}
      title={title}
      date={data.createdAt}
      
      amount={
        <p className={color}>{amount}</p>
      }

      footerText={text}
      addressNumber={accountNumber}
      operationName={data.operationName}

    />

  );

};

const Swap = ({ data }: TransactionData<any>) => {

  const [success, setSuccess] = useState<boolean | undefined>(data.feedback?.success);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [isPaymentSwap, setIsPaymentSwap] = useState(false);
  const [amount, setAmount] = useState<ReactNode>();
  const [isUsdToBrla, setIsUsdToBrla] = useState(false);

  const textColor = pending
    ? "text-gray-500"
    : success
    ? "text-green-700"
    : "text-red-500";


  const coinToFormat = getCurrencyCoinToFormat(data.coin);
  const brlaAmount = formatNumberToString(parseFloat(data.brlaAmount), "BRL");
  const usdAmount = formatNumberToString(
    parseFloat(data.usdAmount),
    coinToFormat
  );

  useEffect(() => {
    
    controlSwapPending(success, data, setPending, setSuccess);

    controlSwapTextComponent(pending, success, isPaymentSwap, data, setMessage);

    controlAmount(success, setAmount, isPaymentSwap, brlaAmount, usdAmount, isUsdToBrla);

    if (data.isPayment) {
      setIsPaymentSwap(true);
    }

    if(data.usdToBrla) {
      setIsUsdToBrla(true);
    }

  }, [success, message, isPaymentSwap, isUsdToBrla]);


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


