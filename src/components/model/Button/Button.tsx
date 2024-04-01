
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
        p-6 rounded-xl w-full text-2xl 
        ${hover ? `hover:${hover}` : 'hover:bg-gray-500'}
        ${classname ?? ''}
        col-span-2 my-4`}
        >

            {text}

            
        </button>
    );
    
}

export default Button;