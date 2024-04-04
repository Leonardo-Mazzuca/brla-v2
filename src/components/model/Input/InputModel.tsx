
import TextModel from '../Text/Text';
import { Field } from '../../types/Field/Field';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const InputModel: React.FC<Field> = ({ 
    placeholder, 
    type, 
    register, 
    name,
    minLength, 
    maxLength, 
    label, 
    onChange,
    onInput,
    value,
    icon,
    addClassName,
    onBlur
}) => {


    
    return (
        <div className='relative flex-1'>
            <TextModel content={label ?? ''} />
            

            {icon &&
                <div className="absolute text-2xl text-gray-400 inset-y-0 flex items-center pl-3.5 pointer-events-none">
                     <FontAwesomeIcon icon={icon} />
                </div>
            }
    

      
            <input
                {...(register && register(name))}
                placeholder={placeholder}
                type={type}
                minLength={minLength}
                maxLength={maxLength}
                name={name}
                value={value}
                onInput={onInput}
                onChange={onChange}
                className={`block w-full p-4 
                border-transparent rounded-lg 
                bg-gray-50 focus:primary-green focus:border-primary-green dark:bg-gray-700 
                dark:placeholder-gray-400 dark:text-white dark:focus:primary-green
                dark:focus:border-primary-green font-semibold placeholder:text-2xl 
                py-6 text-gray-400 ${icon && 'ps-12'}
                mt-2 text-2xl outline-0 ${addClassName}`}
            />
        </div>
    );
};


export default InputModel;
