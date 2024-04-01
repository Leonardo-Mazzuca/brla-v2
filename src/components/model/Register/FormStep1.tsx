

import { Link } from "react-router-dom";
import { Field } from "../../types/Field/Field";
import TextModel from "../Text/Text";
import FormModel from "../Form/FormModel/FormModel";
import { z } from "zod";
import { FormActions, useForm } from "../../context/FormContext";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const schema = z.object({

  email: z.string().email("Email can't be empty!"),

  phone: z.string().min(11, "Phone can't be empty!"),
  
  fullName: z.string().min(3, "Username can't be empty!"),

});

type Step1Data = z.infer<typeof schema>;

const fields: Field[] = [

  { type: "email", placeholder: "Digite seu email", name: "email", icon: faEnvelope },
  { type: "tel", placeholder: "Celular (11 11111-1111)", name: "phone", icon: faPhone },
  { type: "text", placeholder: "Nome ou apelido", name: "fullName",}

];


const FromStep1 = () => {


  const {dispatch} = useForm();

  const handleSubmit = (data: Step1Data) => {

    const { email, phone, fullName } = data;

    dispatch({
      type: FormActions.setStep1,
      payload: { email, phone, fullName },
    });

  };



  return (

    <>

      <FormModel 
      schema={schema} 
      onSubmit={handleSubmit} 
      classname="flex flex-col gap-5" 
      buttonText={'Proximo'} 
      fields={fields} 
      location="/step2">

        <div className="text-start">

        

          <div className="flex gap-2 mt-2 md:items-center items-start">
            <input
              style={{ width: '1em', height: '1em' }}

              className="checkbox:h-3/4 bg-gray-50 border border-gray-300 text-gray-900
              text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
              p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
              mt-1 md:mt-0
              "

              type="checkbox"

              required
          
              id="checkboxInput"
            />

            <label htmlFor="checkboxInput" 
            className="flex md:items-center
            flex-wrap text-gray-400 md:text-2xl text-xl gap-x-2">

              I agree with
              <a href="#" className="flex items-center text-gray-800 hover:underline">
                terms of service & privacy
              </a>
              <img className="w-7" src="/external-link.svg" alt="Image of a link ancor" />

            </label>

          </div>

        </div>

      </FormModel>

      <div className="my-3">

        <TextModel
        color="gray-400"
        size="md:text-2xl text-xl"
        content ={
        

          <>
            Already have an account? {" "}
            <Link className="text-gray-800 hover:underline" to={'/'}>Login here</Link>
          </>
        }
        
        />
      </div>

    </>

  );
};

export default FromStep1;
