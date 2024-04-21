
import { ButtonHTMLAttributes, ReactNode } from "react";
import { BUTTON_PADDING, DEFAULT_TEXT_SIZE, ROUNDED_DEFAULT } from "../../../contants/classnames/classnames";
import {twMerge} from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

    text: ReactNode;
    background? : string
    type?: "button" | "submit";
    textColor? : string
    hover? : string
    classname? : string;
    disabled? : boolean;


}

const Button: React.FC<ButtonProps> = ({ 

    text: Text, background = 'bg-heading-blue', type, textColor, hover,classname
    ,onClick, disabled, ...rest}) => { 

    const className = twMerge(
        `${background} ${textColor ?? 'text-white'} 
        ${BUTTON_PADDING} ${ROUNDED_DEFAULT} w-full ${DEFAULT_TEXT_SIZE}
        ${hover ? `hover:${hover}` : 'hover:bg-gray-500'}
        col-span-2 my-2`, classname
    )

    return (

        <button 
        {...rest}
        type={type} 
        disabled = {disabled}
        className= {className}
        >

           {Text}
            
        </button>
    );
    
}

export default Button;