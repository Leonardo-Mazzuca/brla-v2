import { POINTS_NONE } from "../../../contants/classnames/classnames";
import { CurrencyState } from "../../../context/CurrencyContext";
import { onChainController } from "../../../controller/onChainController.ts/onChainController";


export async function placeChainOrder(state: CurrencyState,walletAddress:string,
     setButtonClassname: React.Dispatch<React.SetStateAction<string>>,
     showLoading: React.Dispatch<React.SetStateAction<boolean>>, 
     onSuccess: React.Dispatch<React.SetStateAction<boolean>>, 
     onError: React.Dispatch<React.SetStateAction<boolean>>,
      setErrorMessage: React.Dispatch<React.SetStateAction<string>>) {

    const data = {
    
        chain: 'Polygon',
        to: walletAddress,
        inputCoin: state.sendCurrency,
        outputCoin: state.receiveCurrency,
        value: parseFloat(state.receiveValue.toFixed(2)) * 100,
        
      }
      

      setButtonClassname(POINTS_NONE);
      showLoading(true);   


      try {

        await onChainController(data.chain, data.to,data.inputCoin, data.outputCoin, data.value);

        onSuccess(true);
        // showLoading(false);
        // showCompleted(true);
        // setButtonClassname(HIDDEN);

        

      } catch(e:any) {

        setErrorMessage('Falha ao enviar dados')
        onError(true);

      }
}

