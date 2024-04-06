

import { ZodSchema, z } from "zod";
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
import { hidden, pointsAll, pointsNone } from "../../types/Button/buttonVariables";
import { formatValueInPhoneNumber } from "../../service/Formatters/FormatPhoneNumber/formatValueInPhoneNumber";
import { isPhoneNumber, validityRawPhoneNumber } from "../../service/TaxId/PhoneNumber/verifyPhoneNumber";
import { isEmail } from "../../service/PixkeyService/verifyEmail";
import { isRandomKey } from "../../service/PixkeyService/verifiyRandomkey";


const TransferStep2 = () => {

    const {state, dispatch} = useCurrency();
    const [schema, setSchema] = useState<ZodSchema>(z.object({}));
    const [fields, setField] = useState<Field[]>([]);
    const [isPixkeyTaxId, controlPixkey] = useState(false);
    const [taxIdValue , setTaxIdValue] = useState('');
    const [classname, setTaxIdClassname] = useState('hidden');
    const [buttonClassname, setButtonClassname] = useState(pointsNone);
    const [pixkeyValue, setPixkeyValue] = useState('');

    const [isPixkeyValid, setIsPixkeyValid] = useState(false);
    const [isTaxIdValid, setIsTaxIdValid] = useState(false);

    const navigate = useNavigate();
    


    useEffect(()=> {

      if(!state.receiveValue) {
        navigate('/home')
      }

    },[]);

        
    const handleTaxIdValue = (e:React.ChangeEvent<HTMLInputElement>) => {

      const value = e.target.value;
    
      setTaxIdValue(value);



    }

    const handlePixkeyValue = (e:React.ChangeEvent<HTMLInputElement>) => {

      const value = e.target.value;

      setPixkeyValue(value);

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
          walletAddress: z.string().min(3),
        }));

        setField([
          { type: "text", placeholder: "Wallet Addrress", name: "walletAddress",  },
        ]);

      }

    },[taxIdValue, classname,pixkeyValue, isPixkeyTaxId]);


    useEffect(() => {



      if(!isBrl(state)) {

        setButtonClassname(pointsAll);

      } else {

        if(isPixkeyTaxId) {
  
          if (isPixkeyValid) {
      
            setButtonClassname(pointsAll);
  
          }
  
        } 
  
        if(!isPixkeyTaxId) {
  
          if (pixkeyValue === '' || taxIdValue === '') {
        
            setButtonClassname(pointsNone);
    
          } else {
  
           if (isPixkeyValid && isTaxIdValid) {
                setButtonClassname(pointsAll);
      
            } else {
                setButtonClassname(pointsNone); 
            }
  
          }
  
        }

      }




      


  }, [isPixkeyValid, isTaxIdValid, isPixkeyTaxId, pixkeyValue, taxIdValue, buttonClassname]);
  


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
        setTaxIdClassname(hidden);
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
          
          setTaxIdClassname(hidden);
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

    type Step2Data = z.infer<typeof schema>;

    const handleSubmit = (data: Step2Data) => {

      if(isBrl(state)) {

        const {pixkey, taxId} = data;
  
        if(isPixkeyTaxId) {
  
          dispatch({
  
            type: CurrencyActions.setTaxId,
            payload: {taxId: pixkey},
  
          });
  
          dispatch({
  
            type: CurrencyActions.setPixkey,
            payload: {pixkey: pixkey},
  
          });
  
        } else {

          dispatch({
    
            type: CurrencyActions.setTaxId,
            payload: {taxId},
    
          });
    
          dispatch({
    
            type: CurrencyActions.setPixkey,
            payload: {pixkey},
    
          });

        }
  

      } else {
        
        const { walletAddress } = data;

        dispatch({
  
          type: CurrencyActions.setWalletAddress,
          payload: {walletAddress},
  
        });


      }
      
      
    }


    return (

      <ContainerService path = "/home" linkText="Dashboard">

            <TransfersContainer isButtonPresent = {false} activeIndex={1}>
                
                  <FormModel 

                   buttonClassname={buttonClassname} 
                   location="/transfer/3" 
                   buttonText={<>Proximo <FontAwesomeIcon className="ms-2" icon={faArrowRight} /></>}
                   fields={fields} schema={schema} onSubmit={handleSubmit}>

                    <div className="mt-6">
                      
                        <div className="flex justify-between mb-6">
                              <TextModel addons="text-gray-400" weight="font-light" content={"Valor a ser enviado"} />
                              <TextModel addons="text-gray-400" weight="font-light" content={`- ${formatNumberToString(state.receiveValue, state.receiveCurrency)}`} />
                        </div>

                    </div>  

                  </FormModel>  

            </TransfersContainer>

      </ContainerService>

    );
}

export default TransferStep2;