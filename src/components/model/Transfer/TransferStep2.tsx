

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
import { getCurrencyCoinToFormat } from "../../service/CoinsService/getCurrencyCoinToFormat";


const TransferStep2 = () => {

    const {state, dispatch} = useCurrency();
    const [schema, setSchema] = useState<ZodSchema>(z.object({}));
    const [fields, setField] = useState<Field[]>([]);
    const [isPixkeyTaxId, controlPixkey] = useState(false);
    const [taxIdValue , setTaxIdValue] = useState('');
    const navigate = useNavigate();


    useEffect(()=> {

      if(!state.receiveValue) {
        navigate('/home')
      }

    },[]);

        
    const handleTaxIdValue = (e:React.ChangeEvent<HTMLInputElement>) => {

      const value = e.target.value;


      if (isCpf(value)) {

          setTaxIdValue(formatValueInCpf(value));

      }

      if(isCnpj(value)) {

        setTaxIdValue(formatValueInCnpj(value));


      }

    
      
      if(!isCnpj(value) && !isCpf(value)) {

        setTaxIdValue(value);
        
        

      }


    }

    useEffect(()=> {

      if(isBrl(state)) {

        setSchema(z.object({

            pixkey: z.string().min(3).refine(pixkey => handlePixkey(pixkey)),
            taxId: z.string().max(14).refine(taxId => handleTaxId(taxId), 
            {message: 'Insira um taxId válido'}).nullable(),
      
          })
        );

        setField([

          { type: "text", placeholder: "Chave pix", name: "pixkey",  },
          { type: "text", placeholder: "taxId", name: "taxId" ,
           maxLength: 18, addClassName: isPixkeyTaxId ? 'hidden' : 'block', onChange: handleTaxIdValue, 
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

    },[taxIdValue, isPixkeyTaxId]);



    const handleTaxId = (value:string) => {

      return isCpf(value) || isCnpj(value);

    }

    
    const handlePixkey = (pixkey: string) => {

      if(isCpf(pixkey) || isCnpj(pixkey)) {

        controlPixkey(true);
   

      } else {

        controlPixkey(false);
        
      }

      return true;

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
            payload: {pixkey},
  
          });
  
        } 
  
        dispatch({
  
          type: CurrencyActions.setTaxId,
          payload: {taxId},
  
        });
  
        dispatch({
  
          type: CurrencyActions.setPixkey,
          payload: {pixkey},
  
        });

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
                
                  <FormModel location="/transfer/3" buttonText={<>Proximo <FontAwesomeIcon className="ms-2" icon={faArrowRight} /></>}
                   fields={fields} schema={schema} onSubmit={handleSubmit}>

                    <div className="mt-6">
                      
                        <div className="flex justify-between mb-6">
                              <TextModel addons="text-gray-400" weight="font-light" content={"Valor a ser enviado"} />
                              <TextModel addons="text-gray-400" weight="font-light" content={`- ${formatNumberToString(state.receiveValue, getCurrencyCoinToFormat(state.receiveCurrency))}`} />
                        </div>

                    </div>  

                  </FormModel>  

            </TransfersContainer>

      </ContainerService>

    );
}

export default TransferStep2;