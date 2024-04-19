
import Transfer from "./components/Transfer/Transfer";
import { Receive } from "./components/Receive/Receive";
import Swap from "./components/Swap/Swap";


export type TransactionData<T> = {
  data: T;
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