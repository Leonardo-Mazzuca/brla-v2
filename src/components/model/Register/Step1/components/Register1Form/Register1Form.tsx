import { useFieldArray, useForm } from "react-hook-form"
import { optional, z } from "zod";
import  { Field } from "../../../../Input/InputModel/InputModel";
import { faEnvelope, faPen, faPerson, faPhone } from "@fortawesome/free-solid-svg-icons";
import {  useEffect } from "react";
import Button from "../../../../Button/Button";
import { PersonTypeCheckBox } from "../PersonTypeCheckbox/PersonTypeCheckbox";
import { Register1State, useRegisterForStep1 } from "../../context/Register1Context";
import { zodResolver } from "@hookform/resolvers/zod";
import { PJFields } from "../PJFields/PJFields";
import { useCnpj } from "./hooks/useCnpj";
import { useTranslation } from "react-i18next";
import { PFFields } from "../PFFields/PFFields";
import { usePhone } from "./hooks/usePhone";
import { useCpf } from "./hooks/useCpf";
import { useSubmit } from "./hooks/useSubmit";
import { useRegister } from "../../../../../../context/Register/FormContext";
import { useNavigate } from "react-router-dom";
import { REGISTER_2 } from "../../../../../../contants/Paths/paths";




export const Register1Form = () => {



    const {state} = useRegisterForStep1();
    const {state:registerState} = useRegister();

    const {t, i18n} = useTranslation();

    const {handleCnpjValidation} = useCnpj();
    const {cpf, handleCpfChange, handleCpfValidation} = useCpf();
    const {handlePhoneChange,phone, handlePhoneValidation} = usePhone();
    const {submitEvents,RegisterCases} = useSubmit();  
    const navigate = useNavigate();

    const register1Schema = z.object({

      email: z.string().email("Email não pode ser vazio"),
    
      phone: z.string().min(1, "O Telefone precisa ser preenchido").refine(phone => handlePhoneValidation(phone),{message: 'Insira um telefone válido!'}),

      fullname: z.string().min(1,'O nome não pode ficar vazio'),

      cpf: z.string().min(1,'CPF não pode ficar vazio').refine(cpf => handleCpfValidation(cpf),{message:"CPF inválido"}),

      birthDate: z.string().min(1,'Insira sua data de aniversário'),

      country: z.string({required_error: 'País é necessário para o cadastro!'}),

      ...(state.isPJ &&{

        dataPJ: z.array(z.object({
  
          cnpj: z.string({required_error: 'CNPJ é necessário para o cadastro!'})
          .min(1,'CNPJ não pode ficar vazio')
          .refine(cnpj => handleCnpjValidation(cnpj),{message: 'CNPJ inválido'})  ,
          
          startDate: z.string().min(1, 'A data não pode ser vazia'),
          companyName: z.string().min(1, 'O nome não pode ser vazio'),
  
        })).optional(),

      })

    });

    const {handleSubmit, register, formState: {errors}, control} = useForm<Register1State>({
      resolver: zodResolver(register1Schema),
      mode: 'all',
      criteriaMode: 'all',

    });


    const {fields, append, remove} = useFieldArray<Register1State>({

      name: 'dataPJ',
      control: control

    })  

    const handlePersonTypeCLick = () => {

      append(

        {

         cnpj: '',
         startDate: '',
         companyName: '',

        }

      )

      if(fields.length===1){
        remove(fields.length-1)
      }

    }
    
    const pfFields: Field[] = [
  
      { type: "email", 
        placeholder: "Email", 
        name: "email", 
        icon: faEnvelope, 
        register: register
      
      },

      { 

        type: "tel",
        placeholder: "Celular (11 11111-1111)", 
        name: "phone", icon: faPhone, 
        value: phone, 
        onChange: handlePhoneChange,
        register: register
       
      
      },

      { 

        type: "text",
        placeholder: "Nome completo", 
        name: "fullname", icon: faPen, 
        register: register
      
      },

      { 

        type: "text",
        placeholder: "CPF (111.111.111-11)", 
        name: "cpf", icon: faPerson, 
        value: cpf, 
        onChange: handleCpfChange,
        register: register
       
      },
     
    ];




    const onSubmit = (data:Register1State) => {
      
      const cases = {

        actions: {

          submitForPj: state.isPJ && state.country === 'Brasil',
          submitForPf: !state.isPJ && state.country === 'Brasil',
          submitForRegnum: state.country !== 'Brasil'

        }

      }

      
      if(cases.actions.submitForPf) {

        submitEvents(data, RegisterCases.submitForPf);

      } else if(cases.actions.submitForPj) {
        submitEvents(data, RegisterCases.submitForPj)

      } else if(cases.actions.submitForRegnum) {

        submitEvents(data,RegisterCases.submitForRegnum)

      }


      navigate(REGISTER_2);

      
    }

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
              const inputs = document.querySelectorAll('input');
              inputs.forEach((input: HTMLInputElement) => {
                  input.blur();
              });
              event.preventDefault();
              handleSubmit(onSubmit)();
          }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };

  }, []);

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            <PFFields

                fields={pfFields}
               register={register} 
               control={control} 
               errors={errors}
              />

            <PersonTypeCheckBox onClick={handlePersonTypeCLick} />

            {state.isPJ && 

            <PJFields

             fields={fields}
             register={register} 
             errors={errors}
             control={control}
             
             />}



            <Button
              text = 'Próximo'
            />


        </form>

    );




}