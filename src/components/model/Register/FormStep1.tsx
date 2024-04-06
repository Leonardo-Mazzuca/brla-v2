

import { Link } from "react-router-dom";
import { Field } from "../../types/Field/Field";
import TextModel from "../Text/Text";
import FormModel from "../Form/FormModel/FormModel";
import { z } from "zod";
import { FormActions, useForm } from "../../context/FormContext";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { DEFAULT_ICON_SIZE, DEFAULT_TEXT_SIZE, FLEX, FLEX_WRAP, GAP_DEFAULT, ITEMS_CENTER, ITEMS_START, MARGIN_Y_3, ROUNDED_DEFAULT, TEXT_GRAY_400, TEXT_GRAY_800, TEXT_SMALL, WIDTH_FULL } from "../../contants/classnames/classnames";

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
      buttonText={'Proximo'} 
      fields={fields} 
      location="/step2"
      >

        <div className="text-start">

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
            className={`${FLEX} md:${ITEMS_CENTER}
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
