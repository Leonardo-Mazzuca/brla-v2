import React, { useState } from "react";
import { Field } from "../../types/Field/Field";
import { usePasswordValidation } from "../../service/PasswordService/usePasswordValidation";
import FormModel from "../Form/FormModel/FormModel";
import { z } from "zod";
import { FormActions, useForm } from "../../context/FormContext";


const FromStep3: React.FC = () => {
    const {errors, handlePasswordChange, handleConfirmPasswordChange } = usePasswordValidation();
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [confirmPasswordChanged, setConfirmPasswordChanged] = useState(false);
    const { dispatch, state } = useForm();

    const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handlePasswordChange(e);
        setPasswordChanged(true);
    };

    const handleConfirmPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleConfirmPasswordChange(e);
        setConfirmPasswordChanged(true);
    };

    const handleSubmit = async (data: Step3Data) => {
        const { password, confirmPassword } = data;

        dispatch({
            type: FormActions.setStep3,
            payload: { password, confirmPassword },
        });



    };

    const fields: Field[] = [
        { label: "Password", type: "password", placeholder: "*********", name: "password", onChange: handlePasswordInputChange },
        { label: "Confirm Password", type: "password", placeholder: "*********", name: "confirmPassword", onChange: handleConfirmPasswordInputChange },
    ];

    const schema = z.object({ 
        password: z.string().min(8, "Password can't be empty!").refine( pass => errors.length === 0, {message: " "}), 
        confirmPassword: z.string().min(8,"Confirm Password can't be empty!").refine(pass => errors.length === 0,{message: " "})
     });

     type Step3Data = z.infer<typeof schema>;

    return (
        <FormModel schema={schema} location="/step4" buttonText="Next"
         fields={fields} onSubmit={handleSubmit}>

            {(passwordChanged || confirmPasswordChanged) && (
                <div className="flex gap-2 flex-col gap-2">
                    {errors.map((error, index) => (
                        <div key={index} className="flex items-center my-2 gap-2">
                            <i className="fa-solid fa-x" style={{ color: "#e01010" }}></i>
                            <p className="text-gray-500 text-2xl mb-1">{error}</p>
                        </div>
                    ))}
                </div>
            )}

        </FormModel>
    );
};

export default FromStep3;
