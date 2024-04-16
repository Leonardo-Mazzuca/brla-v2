

import { Link } from "react-router-dom";
import { Field } from "../../types/Field/Field";
import TextModel from "../Text/Text";
import FormModel from "../Form/FormModel/FormModel";
import { z } from "zod";
import { FormActions, useForm as innerUseForm } from "../../context/FormContext";
import { faBuilding, faEnvelope, faIdCard, faPhone } from "@fortawesome/free-solid-svg-icons";
import { DEFAULT_ICON_SIZE, DEFAULT_TEXT_SIZE, FLEX, FLEX_WRAP, GAP_DEFAULT, ITEMS_CENTER, ITEMS_START, MARGIN_Y_3, ROUNDED_DEFAULT, TEXT_GRAY_400, TEXT_GRAY_800, TEXT_SMALL, WIDTH_FULL } from "../../contants/classnames/classnames";
import React, { ReactNode, useEffect, useState } from "react";
import { validityRawPhoneNumber } from "../../service/TaxId/PhoneNumber/verifyPhoneNumber";
import { formatValueInPhoneNumber } from "../../service/Formatters/FormatPhoneNumber/formatValueInPhoneNumber";
import { REGISTER_2 } from "../../contants/Paths/paths";
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';

import { countries } from "../../Variables/countries";
import { useTranslation } from 'react-i18next';
import InputModel from "../Input/InputModel";
import { isCpf } from "../../service/TaxId/Cpf/verifyCpf";
import { formatValueInCpf } from "../../service/TaxId/Cpf/formatValueInCpf";
import { isCnpj } from "../../service/TaxId/Cnpj/verifyCnpj";
import { formatValueInCnpj } from "../../service/TaxId/Cnpj/formatValueInCnpj";
import formatDate from "../../service/Formatters/FormatDate/formatDate";



const FromStep1 = () => {

  const [phone, setPhone] = useState<string>('');
  const [innerFields, setInnerFields] = useState<Field[]>([]);
  const [personType, setPersonType] = useState('PF')
  const [personCountry, setPersonCountry] = useState('BR')
  const [type, setType] = useState('text');
  const [birthValue,setBirthValue] = useState('');
  const [startDate,setStartDate] = useState('');
  const [cpf,setCpf] = useState('');
  const [fullName,setFullName] = useState('');
  const [cnpj,setCnpj] = useState('');
  const [country, setCountry] = useState('');
  const { t, i18n} = useTranslation();
  const [companyName, setCompanyName] = useState('');

  const {control, setValue} = useForm();

  const {dispatch} = innerUseForm();

  const handlePhone = (phone:string) => {

    if(validityRawPhoneNumber(phone)){

      setPhone(formatValueInPhoneNumber(phone))

      return true;
    }
    return false;

  }

  const schema = z.object({

    email: z.string().email("Email can't be empty!"),
  
    phone: z.string().min(11, "Phone can't be empty!").refine(phone => handlePhone(phone),{message: 'Insira um telefone válido!'}),
  
  
  });

  const handlePhoneChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
  }

  interface OptionType {
    value: string;
    label: string;
  }
  

  const handleCountryChange = (selectedOption:any) => {
    const newValue = selectedOption ? selectedOption.value : '';
    setCountry(newValue);  // Atualiza o estado local
    setValue('country', newValue, { shouldValidate: true });  // Atualiza o valor no react-hook-form
  };
  type Step1Data = z.infer<typeof schema>;
  
  const field: Field[] = [
  
    { type: "email", placeholder: "Digite seu email", name: "email", icon: faEnvelope },
    { type: "tel", placeholder: "Celular (11 11111-1111)", name: "phone", icon: faPhone, value: phone, onChange: handlePhoneChange },
  
        

  ];

  const handleDateClick = () => {
    setType('date');
  }


  const handleBirthChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value;
    setBirthValue(formatDate(value));

  }

  const handlestartDateChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value;
    setStartDate(formatDate(value));

  }

  const handleCpfChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCpf(formatValueInCpf(value))

  }

  const handleCnpjChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value;

   
    setCnpj(formatValueInCnpj(value))
    

  }

  
  const handleFullNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value)
  }

  const handleCompanyNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCompanyName(value)
  }

  useEffect(()=> {

      if(personType === 'PJ' && personCountry==='BR') {

        setInnerFields([
          { type: "text", placeholder: "Nome completo do representante legal", name: "fullName", onChange:handleFullNameChange, value: fullName},
          { type: "text", placeholder: "cpf do representante legal", name: "cpf", icon: faIdCard, onChange:handleCpfChange, value: cpf },
          { type: type, placeholder: "Data de nascimento do representante legal", name: "initDate", onClick: handleDateClick,
          value: birthValue, onChange: handleBirthChange
          },
          { type: "text", placeholder: "cnpj", name: "cnpj", icon: faBuilding ,
          value: cnpj, onChange:handleCnpjChange

          },
          { type: "text", placeholder: "Nome da empresa", name: "companyName", onChange: handleCompanyNameChange},
          { type: type, placeholder: "Data de abertura da empresa", name: "initDate", onClick: handleDateClick,
         onChange: handlestartDateChange, value: startDate

          },
  
          
        ])

      } else {

        setInnerFields([
          { type: "text", placeholder: personCountry === 'BR' ?  "Nome completo" : "Nome da empresa", name: "fullName", onChange:handleFullNameChange, value: fullName},
          { type: "text", placeholder: personCountry === 'BR' ? "Digite seu cpf" : "Digite seu número de documento", name: "cpf", icon: faIdCard,onChange:handleCpfChange,
            value: cpf
           },

          { type: type, placeholder: "Data de nascimento", name: "initDate", onClick: handleDateClick,
          value: birthValue, onChange: handleBirthChange
          },

          
        ])

      }
      
console.log("bithValue: ", birthValue)
  },[personType, type, birthValue, startDate, cpf, cnpj, personCountry, fullName])

  const handleSubmit = (data: Step1Data) => {

    const { email, phone } = data;

    if(personType === 'PJ' && personCountry==='BR') {

      dispatch({
        type: FormActions.setPJ,
        payload: { email, phone, taxIdType: 'CNPJ', country, cpf,
        startDate, companyName, cnpj, birthDate:birthValue, fullName
        

        },
      });

    } else if (personCountry==='BR') {

      dispatch({
        type: FormActions.setPF,
        payload: { email, phone, taxIdType: 'CPF', country, fullName, cpf, birthDate:birthValue

        },
      });

    } else {
      dispatch({
        type: FormActions.setRegnum,
        payload: { email, phone, taxIdType: 'REGNUM', country, cpf,birthDate:birthValue, fullName

        },
      });
    }

 

  };

  const handlePersonType = (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.checked;
    
    if (personCountry==='BR') {
      if (value) {
        setPersonType('PJ');
      } else {
        setPersonType('PF');
      }  
    } else {
      setPersonType('REGNUM');
    }
  }


  const handlePersonCountry = (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.checked;

    console.log("value: ", value)
    
          if (value) {
            console.log("ta caindo aqui")
        setPersonCountry('GRINGO');
      } else {
        setPersonCountry('BR');
      }  
     
  }



  return (

    <>

      <FormModel 
      schema={schema} 
      onSubmit={handleSubmit} 
      buttonText={'Proximo'} 
      fields={field} 
      location={REGISTER_2}
      >

        <div className="text-start flex flex-col">
<div className="flex space-x-4">
        <div className={`${FLEX} ${GAP_DEFAULT} ${MARGIN_Y_3} md:${ITEMS_CENTER} ${ITEMS_START}`}>

            <input
              style={{ width: '1em', height: '1em' }}

              className={`checkbox:h-3/4 bg-gray-50 border border-gray-300 text-gray-900
              ${TEXT_SMALL} ${ROUNDED_DEFAULT} focus:ring-blue-500 focus:border-blue-500 block ${WIDTH_FULL} 
              p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
              
              `}
              value={"PJ"}
              type="checkbox"
              onChange={handlePersonType} 
              id="checkboxInputIsPJ"
            />

            <label htmlFor="checkboxInputIsPJ" 
            className={`${FLEX} md:items-center
            ${FLEX_WRAP} ${GAP_DEFAULT} ${TEXT_GRAY_400} ${TEXT_SMALL} md:${DEFAULT_TEXT_SIZE}`}>

              {t('sou_pj')}

            </label>

          </div>


          <div className={`${FLEX} ${GAP_DEFAULT} ${MARGIN_Y_3} md:${ITEMS_CENTER} ${ITEMS_START}`}>

<input
  style={{ width: '1em', height: '1em' }}

  className={`checkbox:h-3/4 bg-gray-50 border border-gray-300 text-gray-900
  ${TEXT_SMALL} ${ROUNDED_DEFAULT} focus:ring-blue-500 focus:border-blue-500 block ${WIDTH_FULL} 
  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
  
  `}
  value={"GRINGO"}
  type="checkbox"
  onChange={handlePersonCountry} 
  id="checkboxInputIsGringo"
/>

<label htmlFor="checkboxInputIsGringo" 
className={`${FLEX} md:items-center
${FLEX_WRAP} ${GAP_DEFAULT} ${TEXT_GRAY_400} ${TEXT_SMALL} md:${DEFAULT_TEXT_SIZE}`}>

  Sou não residente do Brasil

</label>

</div>
</div>
          
        <div className="my-3">

          {innerFields.map((item:Field, index: number)=> {
            return (
              <InputModel 
              key={index}
              type={item.type}
              name={item.name}
              placeholder={item.placeholder}
              icon={item.icon}
              onClick={item.onClick}
              onChange={item.onChange}
              />
            )
          })}

        </div>
          

          <div className={`${FLEX} ${GAP_DEFAULT} ${MARGIN_Y_3} md:${ITEMS_CENTER} ${ITEMS_START}`}>

            <input
              style={{ width: '1em', height: '1em' }}

              className={`checkbox:h-3/4 bg-gray-50 border border-gray-300 text-gray-900
              ${TEXT_SMALL} ${ROUNDED_DEFAULT} focus:ring-blue-500 focus:border-blue-500 block ${WIDTH_FULL} 
              p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
              
              `}
              type="checkbox"
              required
              id="checkboxInput"
            />

            <label htmlFor="checkboxInput" 
            className={`${FLEX} md:items-center
            ${FLEX_WRAP} ${GAP_DEFAULT} ${TEXT_GRAY_400} ${TEXT_SMALL} md:${DEFAULT_TEXT_SIZE}`}>

              I agree with
              <a href="#" className={`${FLEX} ${ITEMS_CENTER} ${TEXT_GRAY_800} hover:underline`}>
                terms of service & privacy
              </a>
              <img className={DEFAULT_ICON_SIZE} src="/external-link.svg" alt="Image of a link ancor" />

            </label>

          </div>

        </div>

      </FormModel>

      <div className="my-2">

        <TextModel
        color="gray-400"
        addons={`${TEXT_SMALL} md:${DEFAULT_TEXT_SIZE}`}
        content ={
        

          <div className={`${FLEX} ${GAP_DEFAULT}`}>
            <p className={TEXT_GRAY_400}>Already have an account?</p> 
            <Link className={`${TEXT_GRAY_800} hover:underline`} to={'/'}>Login here</Link>
          </div>
        }
        
        />
      </div>

    </>

  );
};

export default FromStep1;
