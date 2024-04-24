import React from "react";
import { Form } from "../../Form/FormWrapper";
import { HeadingText } from "./components/HeadingText/HeadintText";
import { FormRegister4 } from "./components/FormRegister4/FormRegister4";


const FormStep4: React.FC = () => {

  return (
    


    <Form.Container>
      

      <Form.Wrapper>

            <Form.Link 
            path="/" 
            content="Voltar para o login"
            inCenter
            
            />

            <Form.Heading 
            content="Confirme seu email"
            inCenter
            />
        
            <HeadingText />

            <FormRegister4 />

      </Form.Wrapper>


    </Form.Container>

  );
};

export default FormStep4;
