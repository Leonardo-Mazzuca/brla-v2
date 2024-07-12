
import { useNavigate } from "react-router-dom";
import Button from "../../../../Button/Button"
import { ErrorsPassword } from "../ErrorsPassword/ErrorsPassword"
import { Register3Fields } from "../Register3Fields/Register3Fields"
import { FormActions, useRegister } from "../../../../../../context/Register/FormContext";
import { usePasswordValidation } from "../../../../../../hooks/Password/usePasswordValidation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordProps } from "../../@types/PasswordProps";
import { useForm } from "react-hook-form";
import { REGISTER_4 } from "../../../../../../contants/Paths/paths";
import { Field } from "../../../../Input/InputModel/InputModel";



export const Register3Form = () => {

 const {state} = useRegister();

const {customErrors, handlePasswordChange, handleConfirmPasswordChange } = usePasswordValidation();

const [passwordChanged, setPasswordChanged] = useState(false);

const [confirmPasswordChanged, setConfirmPasswordChanged] = useState(false);

const navigate = useNavigate();

const schema = z.object({ 
    password: z.string().min(1,"Password can't be empty!").refine(pass => customErrors.length === 0, {message: " "}), 
    confirmPassword: z.string().min(1,"Confirm Password can't be empty!").refine(pass => customErrors.length === 0,{message: " "})
 });


const {register,handleSubmit,formState:{errors}} = useForm<PasswordProps>({
    resolver: zodResolver(schema),
    mode: 'all',
    criteriaMode: 'all',
});

const { dispatch } = useRegister();

const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlePasswordChange(e);
    setPasswordChanged(true);
};

const handleConfirmPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleConfirmPasswordChange(e);
    setConfirmPasswordChanged(true);
};

const onSubmit = (data: PasswordProps) => {
    
    const { password, confirmPassword } = data;

    dispatch({
        type: FormActions.setStep3,
        payload: { password, confirmPassword },
    });

    navigate(REGISTER_4);

};

    useEffect(()=> {

        console.log(state);
        
    },[state]);


    const fields: Field[] = [
        { label: "Password", type: "password", placeholder: "*********", name: "password", onChange: handlePasswordInputChange, register: register },
        { label: "Confirm Password", type: "password", placeholder: "*********", name: "confirmPassword", onChange: handleConfirmPasswordInputChange, register: register  },
    ];



    return (


        <form onSubmit={handleSubmit(onSubmit)}>

        <Register3Fields errors={errors} fields={fields} />
        
        {(passwordChanged || confirmPasswordChanged) && 
         <ErrorsPassword  errors={customErrors}/>
        }

        <Button text = {'Próximo'} />

        </form>

    )


}