import { InputHTMLAttributes, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'

interface InputPhoneProps extends InputHTMLAttributes<HTMLInputElement> {

    control: Control<any, any , any>;
    name: string;

}

export const InputPhone = ({control, name} : InputPhoneProps) => {


    const {t,i18n} = useTranslation();

    const [phone, setPhone] = useState('');

    return (
    
        <div
        className="cb-input floating-label no-label box-content h-16 w-full"
        >

        <div className="relative">

        <Controller

                control={control}
                name={name}
                rules={{ required: true }}
                render={({ field }) => (
                <PhoneInput
                placeholder={t('phone')}
                value={phone}
                ref={field.ref}
                onChange={value => {

                if(value){
                    setPhone(value);
                }

                field.onChange(value); 
                }}
                
                />

                )}

                />
        </div>

      </div>

    );



}