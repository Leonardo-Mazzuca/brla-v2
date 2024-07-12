import React from "react";
import { Form } from "../../Form/FormWrapper";
import { Register3Form } from "./components/Register3Form/Register3Form";




const FormStep3: React.FC = () => {
    
    return (
        


        <Form.Container>

                <Form.Wrapper>

                    <Form.Heading content="Create your password using our check list" />

                    <Register3Form />

                </Form.Wrapper>

        </Form.Container>

    );
};

export default FormStep3;