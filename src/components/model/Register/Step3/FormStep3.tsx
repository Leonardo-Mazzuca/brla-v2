import React, { useState } from "react";
import FormModel from "../../Form/FormModel/FormModel";
import { z } from "zod";
import { FormActions, useRegister } from "../../../../context/Register/FormContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { usePasswordValidation } from "../../../../hooks/Password/usePasswordValidation";
import { Field } from "../../Input/InputModel/InputModel";
import { REGISTER_4 } from "../../../../contants/Paths/paths";
import { TEXT_GRAY_500, TEXT_RED_600 } from "../../../../contants/classnames/classnames";
import { Form } from "../../Form/FormWrapper";


const FormStep3: React.FC = () => {
    const {errors, handlePasswordChange, handleConfirmPasswordChange } = usePasswordValidation();
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [confirmPasswordChanged, setConfirmPasswordChanged] = useState(false);
    const { dispatch } = useRegister();

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
        password: z.string().min(8,"Password can't be empty!").refine(pass => errors.length === 0, {message: " "}), 
        confirmPassword: z.string().min(8,"Confirm Password can't be empty!").refine(pass => errors.length === 0,{message: " "})
     });

    type Step3Data = z.infer<typeof schema>;

    return (
        


        <Form.Container>


                <Form.Wrapper>

                    <Form.Heading content="Create your password using our check list" />

                    <FormModel schema={schema} location={REGISTER_4} buttonText="Next"
                    fields={fields} onSubmit={handleSubmit}>

                        {(passwordChanged || confirmPasswordChanged) && (

                            <div className={`flex gap-4 my-3 flex-col`}>

                                {errors.map((error, index) => (

                                    <div key={index} className={`flex items-center gap-default`}>
                                        <FontAwesomeIcon icon={faX} className={TEXT_RED_600} />
                                        <p className={`${TEXT_GRAY_500} text-sm`}>{error}</p>
                                    </div>

                                ))}

                            </div>

                        )}

                    </FormModel>



                </Form.Wrapper>

        </Form.Container>

    );
};

export default FormStep3;
