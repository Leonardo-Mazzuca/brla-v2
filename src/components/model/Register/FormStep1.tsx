

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
  const [type, setType] = useState('text');
  const [birthValue,setBirthValue] = useState('');
  const [startDate,setStartDate] = useState('');
  const [cpf,setCpf] = useState('');
  const [cnpj,setCnpj] = useState('');
  const [country, setCountry] = useState('');
  const { t, i18n} = useTranslation();
  const [companyName, setCompanyName] = useState('');

  const {control} = useForm();

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


  
  type Step1Data = z.infer<typeof schema>;
  
  const field: Field[] = [
  
    { type: "email", placeholder: "Digite seu email", name: "email", icon: faEnvelope },
    { type: "tel", placeholder: "Celular (11 11111-1111)", name: "phone", icon: faPhone, value: phone, onChange: handlePhoneChange },
    {

      type: "select",
      name: "country",
      controller: (
        <Controller
          name="country"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              options={countries}
              isSearchable
              placeholder={t('country')}
              onChange={value => field.onChange(value)}
              onBlur={() => field.onBlur()} 
              required
            />
          )}
        />
      )
    }
    

  ];

  const handleDateClick = () => {
    setType('date');
  }


  const handleBirthChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value;
    setStartDate(formatDate(value));

  }

  const handlestartDateChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value;
    setBirthValue(formatDate(value));

  }

  const handleCpfChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value;

    setCpf(formatValueInCpf(value))
    

  }

  const handleCnpjChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value;

   
    setCnpj(formatValueInCnpj(value))
    

  }

  useEffect(()=> {

      if(personType === 'PJ') {

        setInnerFields([

          { type: "text", placeholder: "cpf", name: "cpf", icon: faIdCard },
          { type: "text", placeholder: "cnpj", name: "cnpj", icon: faBuilding ,
          value: cnpj, onChange:handleCnpjChange

          },
          { type: "text", placeholder: "Nome da empresa", name: "companyName"},
          { type: type, placeholder: "Data de início", name: "initDate", onClick: handleDateClick,
         onChange: handlestartDateChange, value: startDate

          },
  
          
        ])

      } else {

        setInnerFields([

          { type: "text", placeholder: "Digite seu cpf", name: "cpf", icon: faIdCard,onChange:handleCpfChange,
            value: cpf
           },

          { type: type, placeholder: "Data de aniversário", name: "initDate", onClick: handleDateClick,
          value: birthValue, onChange: handleBirthChange

          },

          
        ])

      }
      

  },[personType, type, birthValue, startDate, cpf, cnpj])

  const handleSubmit = (data: Step1Data) => {

    const { email, phone } = data;

    if(personType === 'PJ') {

      dispatch({
        type: FormActions.setPJ,
        payload: { email, phone, taxIdType: 'CNPJ', country, cpf,
        startDate, companyName, cnpj, birthValue
        

        },
      });

    } else {

      dispatch({
        type: FormActions.setPF,
        payload: { email, phone, taxIdType: 'CPF', country, cpf,birthValue

        },
      });

    }

 

  };

  const handlePersonType = (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.checked;
    
    if (value) {
      setPersonType('PJ');
    } else {
      setPersonType('PF');
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

              Sou pessoa física

            </label>

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
