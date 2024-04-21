import React from 'react';
import { Form } from '../Form/FormWrapper';
import { FormFooter } from './components/FormFooter/FormFooter';
import { AuthForm } from './components/AuthForm/AuthForm';


const FormLogin: React.FC = () => {

    return (

        <Form.Container>

            <Form.Wrapper>

                <Form.Heading content='Entre na sua conta'/>

                    <AuthForm />

                <FormFooter />

            </Form.Wrapper>
            
        </Form.Container>

    );
}
 

export default FormLogin;
