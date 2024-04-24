import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Address, FormActions, useRegister } from "../../../../context/Register/FormContext";
import { addressService } from "./service/addressService";

import InputModel, { Field } from "../../Input/InputModel/InputModel";
import { REGISTER_1, REGISTER_3 } from "../../../../contants/Paths/paths";
import { GAP_DEFAULT, TEXT_RED_600 } from "../../../../contants/classnames/classnames";
import { formatCep } from "../../../../functions/Formatters/FormatCep/formatCep";
import { Form } from "../../Form/FormWrapper";
import { FormLink } from "../../Form/FormWrapper/components/FormLink";
import { useForm } from "react-hook-form";
import TextModel from "../../Text/Text";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";

const FormStep2: React.FC = () => {

  const {state:registerState} = useRegister();
  const [error, setError] = useState("");
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');

  const { dispatch } = useRegister();
  const navigate = useNavigate();

  useEffect(()=> {

    console.log(registerState);
    

  },[registerState])
  
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

  const adressSchema = z.object({
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

  const {handleSubmit, register, formState:{errors},watch} = useForm<Address>({

    resolver: zodResolver(adressSchema),

    criteriaMode: 'all',
    mode: 'onBlur',
		reValidateMode: 'onChange',

  });

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
  


  const fields: Field[] = [
    { type: "text", placeholder: "CEP", name: "cep", onChange: handleCep, value: cep, register:register },
    { type: "text", placeholder: "Cidade", name: "city", onChange: handleCity, value: city,register:register  },
    { type: "text", placeholder: "Estado", name: "state", onChange: handleState, value: state,register:register },
    { type: "text", placeholder: "Bairro", name: "street", onChange: handleStreet, value: street,register:register },
    { type: "text", placeholder: "Complemento", name: "complement", onChange: handleComplement, value: complement,register:register },
    { type: "text", placeholder: "Número", name: "number", onChange: handleNumber, value: number,register:register },
  ];


    const district = "District";

    const onSubmit = () => {

      

      dispatch({
        type: FormActions.setStep2,
        payload: {cep, city, state, street, number, district, complement},
      });

      navigate(REGISTER_3)


  };

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {

        if (event.key === 'Enter') {
            const inputs = document.querySelectorAll('input');
            inputs.forEach((input: HTMLInputElement) => {
                input.blur();
            });

            event.preventDefault();
            handleSubmit(onSubmit)();
            
            dispatch({
              type: FormActions.setStep2,
              payload: {cep, city, state, street, number, district, complement},
            });

        }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };

}, [dispatch,cep,city,state,street,number,district,complement]);


  return (



    <Form.Container>

      <Form.Wrapper>

            <FormLink path={REGISTER_1}/>

            <Form.Heading content="Endereço" />

            <form onSubmit={handleSubmit(onSubmit)}>

              <section className={`md:grid md:grid-cols-2 ${GAP_DEFAULT} sm:flex sm:flex-col`}>

                  {fields.map((item,index)=> {

                    return (

                      <div key={index}>
                        <InputModel
                        {...item}
                        />

                      {errors[item.name as keyof Address] && (

                        <TextModel
                            addons={`text-sm`}
                            color={TEXT_RED_600}
                            content={errors[item.name as keyof Address]?.message}
                        />

                        )}


                      </div>
                    )

                  })}

                  <Button 
                  text = {"Próximo"}
                  />

              </section>

            </form>

      </Form.Wrapper>


    </Form.Container>

  );
};

export default FormStep2;
