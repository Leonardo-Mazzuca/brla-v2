


export const validatePassword = (password: string, confirmPassword: string): string[] => {
    const errors: string[] = [];


    if(password === '') {
        errors.push("Password can't be empty!");
    }

    if (!/[!@#%&*]/.test(password)) {
        errors.push("Use at least one special character (@!#%&*)");
    }


    if (!/[A-Z]/.test(password)) {
        errors.push("Use at least one uppercase letter");
    }

   
    if (password.includes("name") || password.includes("email")) {
        errors.push("Don’t use your name or e-mail");
    }


    if (password.length < 8) {
        errors.push("Your password must have at least 8 characters");
    }

    if(password!==confirmPassword) {
        errors.push("Password aren't the same!")
    }

    return errors;
};