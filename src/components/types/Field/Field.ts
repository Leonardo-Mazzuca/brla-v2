
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FieldValues, UseFormRegister } from 'react-hook-form';


export type Field = {
    type: string;
    placeholder?: string;
    name: string;
    minLength?: number;
    maxLength?: number;
    label?: string;
    value?:string;
    icon? : IconProp ;
    addClassName?:string;
    register?: UseFormRegister<FieldValues>;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement> ) => void; 
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
