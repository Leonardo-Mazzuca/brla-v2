
import { BUTTON_PADDING, DEFAULT_TEXT_SIZE, ROUNDED_DEFAULT, WIDTH_FULL } from "../../contants/classnames/classnames";
import ButtonProps from "../../types/Button/ButtonProps";



const Button: React.FC<ButtonProps> = ({ 

    text, background = 'bg-heading-blue', type, textColor, hover,classname
    ,onClick, disabled }) => { 

    return (

        <button 
        onClick={onClick} 
        type={type} 
        disabled = {disabled}
        className=
        {`${background} ${textColor ?? 'text-white'} 
        ${BUTTON_PADDING} ${ROUNDED_DEFAULT} ${WIDTH_FULL} ${DEFAULT_TEXT_SIZE}
        ${hover ? `hover:${hover}` : 'hover:bg-gray-500'}
        ${classname ?? ''}
        col-span-2 my-2`}
        >

            {text}

            
        </button>
    );
    
}

export default Button;