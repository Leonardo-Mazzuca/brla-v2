import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputModel, { Field } from "../../../Input/InputModel/InputModel";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { loginController } from "../../../../../controller/LoginController/loginController";
import { connectWebSocket } from "../../../../../controller/WebSocketController/connectWebSocket";
import { WebSocketActions, useWebSocket } from "../../../../../context/WebSocket/WebSocketContext";
import { useEffect, useState } from "react";
import { TO_HOME } from "../../../../../contants/Paths/paths";
import { USER_LOGGED } from "../../../../../contants/sessionStorageKeys/sessionStorageKeys";
import { useNavigate } from "react-router-dom";
import TextModel from "../../../Text/Text";
import { BLOCK, HIDDEN, POINTS_ALL, POINTS_NONE, TEXT_RED_600 } from "../../../../../contants/classnames/classnames";
import Button from "../../../Button/Button";


const AuthSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, 'Senha é obrigatória'),
});

type AuthData = z.infer<typeof AuthSchema>;

export const AuthForm = () => {

    const [error, setError] = useState('');
    const {dispatch} = useWebSocket();
    const [showText, setShowText] = useState(HIDDEN);
    const [buttonClassname, setButtonclassname] = useState(POINTS_NONE);

    const navigate = useNavigate();

    const {register, formState: {errors}, handleSubmit, watch} = useForm({

        resolver: zodResolver(AuthSchema),
        mode: 'all',
        criteriaMode: 'all',

    });

    const handleInput = () => {

        setError('');

    }

    const watchFields = watch()
    

    const fields: Field[] = [

        { 
        type: "email", 
        placeholder: "Digite seu email",
        name: "email", 
        icon: faEnvelope, 
        register: register,
        onInput: handleInput

        },

        {
        type: "password", 
        placeholder: "Senha", 
        name: "password", 
        icon: faLock, 
        register: register,
        onInput: handleInput

        }

    ]; 

    useEffect(()=> {

        if(Object.values(watchFields).every(value => value !== '')) {

            setButtonclassname(POINTS_ALL)

        } else {

            setButtonclassname(POINTS_NONE)

        }

        if(error) {
            setButtonclassname(POINTS_ALL);
        }
        

        if(showText === BLOCK) {
            setButtonclassname(POINTS_NONE)
        }

    },[watchFields, buttonClassname, error, showText])
        
    async function onSubmit(data: any) {


        if(error) {
            setError('');
        }

        const { email, password } = data;

            setShowText(BLOCK);
                    
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

            setShowText(HIDDEN);
 
    } 

    return (

        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                {fields.map((item : Field, index: number)=> {

                    return (

                        <div key={index}>

                            <InputModel

                            {...item}
                            
                            />

                            {errors[item.name as keyof AuthData] && (

                                <TextModel
                                    addons={`text-sm`}
                                    color={TEXT_RED_600}
                                    content={errors[item.name as keyof AuthData]?.message}
                                />

                            )}
                        
                        </div>

                    )

                })}

                {error && (
                    <TextModel addons="mt-3" color={TEXT_RED_600} content={error} />
                )} 

                <Button

                classname={buttonClassname}
                text = 'login'

                />



            </form>

            <hr className='my-5' />
            
            {showText && <TextModel addons={showText} content={'Carregando...'} />}
        
        </>

    )

}