

import { ZodSchema, isValid, z } from "zod";
import { Field } from "../../types/Field/Field";
import ContainerService from "../Container/ContainerService";
import TransfersContainer from "../Container/TransfersContainer";
import FormModel from "../Form/FormModel/FormModel";
import { CurrencyActions, useCurrency } from "../../context/CurrencyContext";
import { formatNumberToString } from "../../service/Formatters/FormatNumber/formatNumber";
import TextModel from "../Text/Text";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatValueInCpf } from "../../service/TaxId/Cpf/formatValueInCpf";
import { formatValueInCnpj } from "../../service/TaxId/Cnpj/formatValueInCnpj";
import { isCpf } from "../../service/TaxId/Cpf/verifyCpf";
import { isCnpj } from "../../service/TaxId/Cnpj/verifyCnpj";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { isBrl } from "../../service/Util/isBrl";
import { formatValueInPhoneNumber } from "../../service/Formatters/FormatPhoneNumber/formatValueInPhoneNumber";
import { isPhoneNumber, validityRawPhoneNumber } from "../../service/TaxId/PhoneNumber/verifyPhoneNumber";
import { isEmail } from "../../service/PixkeyService/verifyEmail";
import { isRandomKey } from "../../service/PixkeyService/verifiyRandomkey";
import { FLEX, FONT_LIGHT, HIDDEN, JUSTIFY_BETWEEN, POINTS_ALL, POINTS_NONE, TEXT_GRAY_400 } from "../../contants/classnames/classnames";
import { useWebSocket } from "../../context/WebSocketContext";
import { getUserData } from "../../controller/UserDataController/getUserData";
import { isUsdToBrla } from "../../service/Util/isUsdToBrla";
import { TO_WEBSOCKET } from "../../contants/divisionValues/divisionValues";
import { isForWebSocketOnTransfer } from "../../service/WebSocketService/Transfer/isForWebSocket";


const TransferStep2 = () => {

    const {state, dispatch} = useCurrency();
    const [schema, setSchema] = useState<ZodSchema>(z.object({}));
    const [fields, setField] = useState<Field[]>([]);
    const [isPixkeyTaxId, controlPixkey] = useState(false);
    const [taxIdValue , setTaxIdValue] = useState('');
    const [classname, setTaxIdClassname] = useState('hidden');
    const [buttonClassname, setButtonClassname] = useState(POINTS_NONE);
    const [pixkeyValue, setPixkeyValue] = useState('');
    const [walleAddressValue, setWalletAddressValue] = useState('');
    const [isPixkeyValid, setIsPixkeyValid] = useState(false);
    const [isTaxIdValid, setIsTaxIdValid] = useState(false);
    const [userWallet,setUserWallet] = useState('');
    const [validWallet,setValidWallet] = useState(false);
    const [inputValue, setInputValue] = useState(0);
    const [outputValue, setOutputValue] = useState(0);

    
    const {state:webSocketState} = useWebSocket();


    const navigate = useNavigate();

    useEffect(()=> {

      if(!state.receiveValue) {
        navigate('/home');
      }

      if(!webSocketState.webSocket?.OPEN) {

        navigate('/home');
        
      }
 
    },[state.receiveValue, isForWebSocketOnTransfer, webSocketState.webSocket]);

    
    const socketMessageHandler = () => {

      if(webSocketState.webSocket && webSocketState.webSocket.OPEN) {

          webSocketState.webSocket.onmessage = e => {

              const message = JSON.parse(e.data);
              
              if(message.data) {


                console.log(message.data);
                
                if(isUsdToBrla(state)){

                  setInputValue(message.data.amountUsd / TO_WEBSOCKET);
                  setOutputValue(message.data.amountBrl / TO_WEBSOCKET);

              } else {

                  setInputValue(message.data.amountBrl / TO_WEBSOCKET);
                  setOutputValue(message.data.amountUsd / TO_WEBSOCKET);
              }

                
              }   

              if(inputValue && outputValue) {

                setButtonClassname(POINTS_ALL);

              }


                        
          }

      }

    }

    useEffect(() => {

      if(isForWebSocketOnTransfer(state)) {

        socketMessageHandler();

      }

      if(!isForWebSocketOnTransfer(state)){
        setInputValue(state.sendValue);
        setOutputValue(state.receiveValue);
      }


  }, [socketMessageHandler,inputValue,outputValue]);

        
    const handleTaxIdValue = (e:React.ChangeEvent<HTMLInputElement>) => {

      const value = e.target.value;

      
      if(value === '') {

        setIsTaxIdValid(false);

      }
    
      setTaxIdValue(value);

    }

    const handlePixkeyValue = (e:React.ChangeEvent<HTMLInputElement>) => {

      const value = e.target.value;

      if(value === '') {

        setIsPixkeyValid(false);

      }

      

      setPixkeyValue(value);

    }

    const handleWalletAddress = (e:React.ChangeEvent<HTMLInputElement>) => {

      const value = e.target.value;

      if(value === '') {
        setValidWallet(false);
      }

      setWalletAddressValue(value);

    }

    useEffect(()=> {

      const userData = async ()=> {

        const data = await getUserData();
        const userWallet = data?.wallets.evm;

        if(userWallet){
          setUserWallet(userWallet);
        }
        

      }

      if(!isBrl(state)) {
        
        userData();

      }

    },[userWallet]);


    const validateWallet = (wallet:string) => {

      const isValid =  wallet !== userWallet && walleAddressValue !== '';
      setValidWallet(isValid);
      return isValid;

    }
    
    useEffect(()=> {
      

      if(isBrl(state)) {

        setSchema(z.object({

            pixkey: z.string().refine(pixkey => validityPixkey(pixkey),{message: 'Chave pix inválida'}),
            taxId: z.string().max(14).refine(taxId => validityTaxId(taxId), 
            {message: isPixkeyTaxId ? 'Insira um taxId válido' : ''}).nullable(),
      
          })
        );

        setField([

          { type: "text", placeholder: "Chave pix", name: "pixkey", onChange: handlePixkeyValue, 
          value: pixkeyValue},
          
          { type: "text", placeholder: "taxId", name: "taxId" ,
           maxLength: 18, addClassName: classname, onChange: handleTaxIdValue, 
           value: taxIdValue},

        ]);

      } else {

        setSchema(z.object({
          walletAddress: z.string().min(3,{message: 'O endereço não pode ser vazio!'}).refine(wallet => validateWallet(wallet),{message: 'Você não pode transferir para si mesmo'}),
        }));

        setField([
          { type: "text", placeholder: "Wallet Addrress", name: "walletAddress",  onChange: handleWalletAddress,
          value : walleAddressValue},
        ]);

      }

    },[taxIdValue, classname,pixkeyValue, isPixkeyTaxId, walleAddressValue]);



    useEffect(()=> {
      

      if(isBrl(state)) {
  
        if(isPixkeyTaxId) {
  
          dispatch({
  
            type: CurrencyActions.setTaxId,
            payload: {taxId: pixkeyValue},
  
          });
  
          dispatch({
  
            type: CurrencyActions.setPixkey,
            payload: {pixkey: pixkeyValue},
  
          });
  
        } else {

          dispatch({
    
            type: CurrencyActions.setTaxId,
            payload: {taxId: taxIdValue},
    
          });
    
          dispatch({
    
            type: CurrencyActions.setPixkey,
            payload: {pixkey: pixkeyValue},
    
          });

        }
  

      } else {
      

        dispatch({
  
          type: CurrencyActions.setWalletAddress,
          payload: {walletAddress: walleAddressValue},
  
        });


      }
      

    },[dispatch, isPixkeyValid, pixkeyValue, walleAddressValue, isBrl, taxIdValue])

    useEffect(() => {

      
      if(!isBrl(state)) {

        if(validWallet) {

          setButtonClassname(POINTS_ALL);

        } else {

          setButtonClassname(POINTS_NONE);

        }

      } else {
        
              if(isPixkeyTaxId) {
          
                  if (isPixkeyValid) {
              
                    setButtonClassname(POINTS_ALL);
          
                  }
          
                } 
          
                if(!isPixkeyTaxId) {
          
                  if (pixkeyValue === '' || taxIdValue === '') {
                
                    setButtonClassname(POINTS_NONE);
            
                  } else {
          
                   if (isPixkeyValid && isTaxIdValid) {
                        setButtonClassname(POINTS_ALL);
              
                    } else {
                        setButtonClassname(POINTS_NONE); 
                    }
          
                  }
          
                }

      }

      


  }, [isPixkeyValid,validWallet, isTaxIdValid, isPixkeyTaxId, pixkeyValue, taxIdValue, buttonClassname]);

  


    const validityTaxId = (value:string) => {

      if(!isPixkeyTaxId) {

        if (isCpf(value)) {
  
          setTaxIdValue(formatValueInCpf(value));
  
        }
  
        if(isCnpj(value)) {
  
          setTaxIdValue(formatValueInCnpj(value));
  
  
        }
  
        const isValid = isCpf(value) || isCnpj(value);
  
        setIsTaxIdValid(isValid);
        
        return isValid;
      }

      return true;

    }
    
    const validityPixkey = (pixkey: string) => {

      if(pixkey === '') {
        
        setPixkeyValue(pixkey);
        setTaxIdClassname(HIDDEN);
        setIsPixkeyValid(false);
        controlPixkey(false)
        return;

      } else {

   

        if(isCpf(pixkey)) {

          controlPixkey(true)
          setPixkeyValue(formatValueInCpf(pixkey))
    
        }

        if(isCnpj(pixkey)) {

          controlPixkey(true)
          setPixkeyValue(formatValueInCnpj(pixkey))
  
        }

        if(validityRawPhoneNumber(pixkey) && !(isCpf(pixkey) || isCnpj(pixkey))) {

    
              setPixkeyValue(formatValueInPhoneNumber(pixkey))
          
          
        }

        if(isEmail(pixkey)) {
          setPixkeyValue(pixkey);
        }

        if(isRandomKey(pixkey)) {
          setPixkeyValue(pixkey)
        }

        if(isCpf(pixkey) || isCnpj(pixkey)) {
          
          setTaxIdClassname(HIDDEN);
          controlPixkey(true);
          
        } else {

          setTaxIdClassname('block');
          controlPixkey(false);

        }

        const isValid = isCpf(pixkey) || isCnpj(pixkey) || isPhoneNumber(pixkey) || isEmail(pixkey) || isRandomKey(pixkey);
        setIsPixkeyValid(isValid);
        return isValid;
    
      }

    }

    const handleSubmit = () => {

      dispatch({
        type: CurrencyActions.setSendValue,
        payload: {sendValue: inputValue}
      });
      
      dispatch({
        type: CurrencyActions.setReceiveValue,
        payload: {receiveValue: outputValue}
      });

    }


    return (

      <ContainerService path = "/home" linkText="Dashboard">

            <TransfersContainer isButtonPresent = {false} activeIndex={1}>
                
                  <FormModel 
                   onSubmit={handleSubmit}
                   buttonClassname={buttonClassname} 
                   location="/transfer/3" 
                   buttonText={<>Proximo <FontAwesomeIcon className="ms-2" icon={faArrowRight} /></>}
                   fields={fields} schema={schema}>

                    <div className="mt-6">
                      
                        <div className={`${FLEX} ${JUSTIFY_BETWEEN} mb-6`}>
                              <TextModel color={TEXT_GRAY_400} weight={FONT_LIGHT} content={"Valor a ser enviado"} />
                              <TextModel color={TEXT_GRAY_400} weight={FONT_LIGHT} content={`${formatNumberToString(inputValue, state.sendCurrency)}`} />
                        </div>

                        <div className={`${FLEX} ${JUSTIFY_BETWEEN} my-6`}>
                              <TextModel color={TEXT_GRAY_400} weight={FONT_LIGHT} content={"Valor a receber"} />
                              <TextModel color={TEXT_GRAY_400} weight={FONT_LIGHT} content={`${formatNumberToString(outputValue, state.receiveCurrency)}`} />
                        </div>

                    </div>  

                  </FormModel>  

            </TransfersContainer>

      </ContainerService>

    );
}

export default TransferStep2;