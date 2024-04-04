import { useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import InputModel from '../../Input/InputModel';
import { Field } from '../../../types/Field/Field';
import { useNavigate } from 'react-router-dom';
import { Schema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextModel from '../../Text/Text';
import { ReactNode, useEffect, useState } from 'react';

type FormModelProps = {
    children?: ReactNode;
    buttonText?: ReactNode;
    onSubmit(data: any): void;
    fields: Field[];
    classname?: string;
    location?: string;
    schema: Schema;
    submitError?: string;
    navigate? : (path: string) => void;
};

const FormModel: React.FC<FormModelProps> = ({
    children,
    buttonText,
    fields,
    classname,
    onSubmit,
    location,
    schema,
    submitError
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'all',
        criteriaMode: 'all',
        resolver: zodResolver(schema),
    });


    const [errorOnSubmit, setSubmitError] = useState('');
    

    const navigate = useNavigate();

    useEffect(()=> {

        setSubmitError(submitError || '');
        

    }, [submitError]);


    const submitForm = (data: any) => {
        
        
        if(!errorOnSubmit) {

            onSubmit(data);
            if(location) {
                navigate(location);
            }

        }

        
    };

    const handleInput = () => {

        setSubmitError('');

    };


    useEffect(() => {
        
        const handleKeyDown = (event: KeyboardEvent) => {

            if (event.key === 'Enter') {
                const inputs = document.querySelectorAll('input');
                inputs.forEach((input: HTMLInputElement) => {
                    input.blur();
                });
                event.preventDefault();
                handleSubmit(submitForm)();
            }
        };

    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };

        

    }, []);
    
    return (

        <form 
        className={classname ?? 'flex flex-col gap-5'} 
        // onSubmit={handleSubmit(submitForm)} 
         >
            
            {fields &&
                fields.map((field, index) => (
                    <div key={index}>
                        <InputModel
                                
                            type={field.type}
                            placeholder={field.placeholder}
                            register={register}
                            addClassName={field.addClassName}
                            name={field.name}
                            onChange={field.onChange}
                            label={field.label}
                            minLength={field.minLength}
                            maxLength={field.maxLength}
                            value={field.value}
                            icon={field.icon}
                            onInput={handleInput}
                            
                            
                        />

                        {errors[field.name] && (
                            <TextModel addons="mt-3" color="text-red-600" content={errors[field.name]?.message} />
                        )}

                    </div>
                ))}
            
      
            {errorOnSubmit && (
                <TextModel addons="mt-3" color="text-red-600" content={submitError} />
            )}
        

            {children}

            {buttonText && <Button onClick={handleSubmit(submitForm)} text={buttonText} />}
            
        </form>

    );
};

export default FormModel;
