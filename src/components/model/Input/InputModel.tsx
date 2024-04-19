
import TextModel from '../Text/Text';
import React, { InputHTMLAttributes, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { BUTTON_PADDING, DEFAULT_TEXT_SIZE } from '../../../contants/classnames/classnames';



export interface Field extends InputHTMLAttributes<HTMLInputElement> {

    type: string;
    placeholder?: string;
    name: string;
    minLength?: number;
    maxLength?: number;
    label?: string;
    value?:string;
    icon? : IconProp;
    imageIcon? : string ;
    altIcon?:string;
    addClassName?:string;
    controller?:ReactNode;
    register?: UseFormRegister<FieldValues>;

};

const InputModel: React.FC<Field> = ({ 

    placeholder, 
    type, 
    register, 
    name,
    minLength, 
    maxLength, 
    label, 
    value,
    icon,
    addClassName,
    imageIcon,
    altIcon,
    ...rest

}) => {


    
    return (
        
        <div className='relative flex-1'>
            
            <TextModel content={label ?? ''} />
            

            {icon &&
                <div className="absolute text-2xl text-gray-400 inset-y-0 flex items-center pl-3.5 pointer-events-none">
                     <FontAwesomeIcon icon={icon} />
                </div>
            }

            {imageIcon &&

                <div className="absolute inset-y-0 right-0 me-2 flex items-center pl-3.5 pointer-events-none">
                    <img className='w-8' src={imageIcon} alt = {altIcon} />
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
                {...rest}
                className={`block w-full p-4 
                border-transparent rounded-lg 
                bg-gray-50 focus:primary-green focus:border-primary-green dark:bg-gray-700 
                dark:placeholder-gray-400 dark:text-white dark:focus:primary-green
                dark:focus:border-primary-green font-normal placeholder:${DEFAULT_TEXT_SIZE}
                ${BUTTON_PADDING} text-gray-400 ${icon && 'ps-12'}
                mt-2 ${DEFAULT_TEXT_SIZE} outline-0 ${addClassName}`}
                
            />
        </div>
    );
};


export default InputModel;
