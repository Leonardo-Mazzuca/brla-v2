import { ChangeEvent, useEffect, useState } from "react";
import { validatePassword } from "./passwordUtils";



export const usePasswordValidation = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);


    const validatePasswordFields = (password: string, confirmPassword: string) => {
        const passwordErrors = validatePassword(password, confirmPassword);
        setErrors(passwordErrors);
    };

    useEffect(() => {
        validatePasswordFields(password, confirmPassword);
    }, []);
    
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePasswordFields(newPassword, confirmPassword);
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setConfirmPassword(newPassword);
        validatePasswordFields(password, newPassword);
    };

    return { errors, handlePasswordChange, handleConfirmPasswordChange };

}