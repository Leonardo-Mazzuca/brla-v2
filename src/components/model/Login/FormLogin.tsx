import React, {  useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextModel from '../Text/Text';
import { Field } from '../../types/Field/Field';
import FormModel from '../Form/FormModel/FormModel';
import { z } from 'zod';
import { loginController } from '../../controller/LoginController/loginController';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { connectWebSocket } from '../../controller/WebSocketController/connectWebSocket';
import { WebSocketActions, useWebSocket } from '../../context/WebSocketContext';


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

                    navigate('/home');

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
        <div className="flex flex-col gap-7 my-5">
            <a
                className="w-full text-center p-5 font-medium border border-black 
                rounded-xl hover:bg-black hover:text-white text-heading-blue-secondary text-2xl flex justify-center gap-2"
                href=""
            >
                <img src="/Google.svg" className="w-7" alt="Google Icon" /> Continue with Google 
            </a>
            
            <TextModel 
                color='gray-600'
                content={
                    <>
                        Não tem conta ainda?{' '}
                        <Link className="hover:underline" to="/step1">Cadastre-se</Link>
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
