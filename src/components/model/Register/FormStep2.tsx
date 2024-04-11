import React, { useEffect, useState } from "react";
import { Field } from "../../types/Field/Field";
import FormModel from "../Form/FormModel/FormModel";
import { z } from "zod";
import { FormActions, useForm as useFormContext } from "../../context/FormContext";
import { addressService } from "../../service/AddressService/addressService";
import { FLEX, FLEX_COL, GAP_DEFAULT } from "../../contants/classnames/classnames";
import { formatCep } from "../../service/Formatters/FormatCep/formatCep";

const FormStep2: React.FC = () => {

  const [error, setError] = useState("");
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');

  const { dispatch } = useFormContext();

  async function handleCepValue(cep: string) {

    const response = await addressService(cep.replace(/\D/g, ''));

    if (!response) {

      setError("Insira um cep válido!");
      return false;

    } else {

      
      setCity(response.localidade);
      setState(response.uf);
      setStreet(response.logradouro);
      return true;

    }
    
  }

  const handleCity = (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value
    setCity(value)

  }

  const handleState= (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value
    setState(value)

  }
  const handleStreet = (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value
    setStreet(value)

  }
  const handleNumber = (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value
    setNumber(value)

  }

  const handleCep = (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value
    setCep(formatCep(value))

  }
  
  const handleComplement = (e:React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value
    setComplement(value)

  }
  
  const schema = z.object({
    cep: z
      .string()
      .min(1, "Cep não pode ficar vazio!")
      .refine((cep) => handleCepValue(cep), { message: error }),

      city: z.string().refine(() => city !== '' ,{message: 'Cidade é obrigatório'}),
      state: z.string().refine(() => state !== '', {message: 'Estado é obrigatório'}),
      street: z.string().refine(() => street !== '',{message: 'Bairro é obrigatório'}),
      complement: z.string().min(1, "Complemento não pode ser vazio!"),
      number: z.string().refine(()=> number!=='',{message: 'Número é obrigatório'}),

  });

  const fields: Field[] = [
    { type: "text", placeholder: "CEP", name: "cep", onChange: handleCep, value: cep },
    { type: "text", placeholder: "Cidade", name: "city", onChange: handleCity, value: city },
    { type: "text", placeholder: "Estado", name: "state", onChange: handleState, value: state },
    { type: "text", placeholder: "Bairro", name: "street", onChange: handleStreet, value: street },
    { type: "text", placeholder: "Complemento", name: "complement", onChange: handleComplement, value: complement },
    { type: "text", placeholder: "Número", name: "number", onChange: handleNumber, value: number },
  ];

 

    const handleSubmit = () => {

        const district = "District";

        dispatch({
          type: FormActions.setStep2,
          payload: { cep, city, state, street, number, district, complement },
        });
 
      };

  return (

    <FormModel
      schema={schema}
      classname={`md:grid md:grid-cols-2 ${GAP_DEFAULT} sm:${FLEX} sm:${FLEX_COL}`}
      location="/step3"
      buttonText="próximo"
      fields={fields}
      onSubmit={handleSubmit}
    />

  );
};

export default FormStep2;
