import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextModel from '../Text/Text';
import FormModel from '../Form/FormModel/FormModel';
import { z } from 'zod';

import { WebSocketActions, useWebSocket } from '../../../context/WebSocket/WebSocketContext';
import { Field } from '../Input/InputModel';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { loginController } from '../../../controller/LoginController/loginController';
import { connectWebSocket } from '../../../controller/WebSocketController/connectWebSocket';
import { USER_LOGGED } from '../../../contants/sessionStorageKeys/sessionStorageKeys';
import { REGISTER_1, TO_HOME } from '../../../contants/Paths/paths';
import { TEXT_GRAY_600 } from '../../../contants/classnames/classnames';



type LoginData = {
    email: string;
    password: string;
}

const FormLogin: React.FC = () => {

    const [error, setError] = useState('');
    const {dispatch } = useWebSocket();
    
    const fields: Field[] = [
        { type: "email", placeholder: "Digite seu email", name: "email", icon: faEnvelope},
        { type: "password", placeholder: "Senha", name: "password", icon: faLock }
    ];

    const navigate = useNavigate();
    
    async function handleSubmit(data: LoginData) {

        if(error) {
            setError('');
        }

        const { email, password } = data;
                

            try {
    
                await loginController(email, password);

                try {
                   
                    const webSocket = await connectWebSocket();

                    dispatch({
                        type: WebSocketActions.setWebSocket,
                        payload: { webSocket },
                    });

                    sessionStorage.setItem(USER_LOGGED, email);
                    navigate(TO_HOME);

                } catch(e:any) {

                    setError('Falha ao conectar-se ao servidor');
                }

            }  catch(e:any) {

                setError('Dados inválidos!');
              

            }
 
    } 

    const schema = z.object({
        email: z.string().email('Email inválido'),
        password: z.string().min(1, 'Senha é obrigatória'),
    });

    const formFooter = (

        <div className={`flex flex-col gap-2`}>
            <TextModel 
                color={TEXT_GRAY_600}
                addons={'text-sm'}
                content={
                    <>
                        Não tem conta ainda?{' '}
                        <Link className="hover:underline" to={REGISTER_1}>Cadastre-se</Link>
                    </>
                } 
            />
        </div>
    );

    return (

        <>
            <FormModel 

                schema={schema} 
                buttonText='Login' 
                fields={fields} 
                onSubmit={handleSubmit}
                submitError={error}

            />

            <hr className='my-5' />

            {formFooter}

        </>

    );
}
 

export default FormLogin;
