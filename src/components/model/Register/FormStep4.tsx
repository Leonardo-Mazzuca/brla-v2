import React, { useEffect, useRef, useState } from 'react';
import Button from "../Button/Button";
import TextModel from '../Text/Text';

import { useNavigate } from 'react-router-dom';
import { useForm } from '../../context/FormContext';
import { validateUserController } from '../../controller/ValidateUserController/validateUserController';
import { registerController } from '../../controller/RegisterController/RegisterController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';


const inputItems = ['code1', 'code2', 'code3', 'code4', 'code5', 'code6'];

const FormStep4: React.FC = () => {
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    
    const { state } = useForm();
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState('');


    const handleRegister = () => {
        
        try {
            registerController(state);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        inputRefs.current[0]?.focus();
        handleRegister();
    }, []);

    const handleKeyUp = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        if (value.length === 1 && index < inputItems.length - 1) {
            inputRefs.current[index + 1]?.focus();
        } else if (value.length === 0 && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleChange = (name: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInput = () => {
        setError('');
    }
 
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();
        
        const {code1,code2,code3,code4,code5,code6} = formData;

        const token = code1 + code2 + code3 + code4 + code5 + code6;
    
        const email = state.email;
    
        try {

            const status = await validateUserController(email, token);

            if(status.error) {
                
                
                formRef.current?.reset();
                setError('Código incorreto ou inválido!');
                
            } else {
                navigate('/');
            }

        } catch (e) {
            console.error(e);
        }
    }

    return (

        <section className="flex flex-col justify-center align-center gap-2 text-center">
            <div className="my-3">
                <TextModel color='gray-500' content='Por favor, informe o código que enviamos para o seu e-mail. Não esqueça de verificar o spam.'/>
            </div>

            <form ref={formRef} onSubmit={handleSubmit}>

                <div className='flex justify-center flex-wrap md:gap-6 gap-2 items-center my-6'>

                    {inputItems.map((item, index) => (
                        <input
                            key={index}
                            type='text'
                            name={item}
                            ref={(ref: HTMLInputElement | null) => (inputRefs.current[index] = ref)}
                            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyUp(index, event)}
                            maxLength={1}
                            className='block md:w-14 w-12 h-12 md:h-14 py-3 text-lg font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                            required
                            onChange={(e) => handleChange(item, e.target.value)}
                            onInput={handleInput}
                        />
                    ))}
                    
                </div>

                {error && <TextModel addons="mt-3" content={<><FontAwesomeIcon className='text-red-600' icon={faX} /> {error}</>} />}

                <Button text="Confirmar código"/>
                
                <Button
                    onClick={handleRegister}
                    text="Mandar código novamente"
                    type="button"
                    background="bg-transparent"
                    textColor="text-gray-500"
                    hover="underline hover:text-gray-400"
                />

            </form>

           
        </section>
    );
};

export default FormStep4;
