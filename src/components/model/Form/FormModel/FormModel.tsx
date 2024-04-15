import { useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import InputModel from '../../Input/InputModel';
import { Field } from '../../../types/Field/Field';
import { useNavigate } from 'react-router-dom';
import { Schema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextModel from '../../Text/Text';
import { ReactNode, useEffect, useState } from 'react';
import { BLOCK, HIDDEN, POINTS_ALL, POINTS_NONE, TEXT_RED_600, TEXT_SMALL } from '../../../contants/classnames/classnames';
// Corrected import path

type FormModelProps = {
    children?: ReactNode;
    buttonText?: ReactNode;
    onSubmit(data: any): void;
    fields: Field[];
    classname?: string;
    location?: string;
    schema: Schema;
    submitError?: string;
    navigate?(path: string): void;
    buttonClassname?: string;
};

const FormModel: React.FC<FormModelProps> = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'all',
        criteriaMode: 'all',
        resolver: zodResolver(props.schema),
    });

    const [errorOnSubmit, setSubmitError] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(POINTS_ALL);
    const [showText, setShowText] = useState(HIDDEN);

    const navigate = useNavigate();

    useEffect(() => {
        setSubmitError(props.submitError || '');
    }, [props.submitError]);

    useEffect(() => {
        if (errorOnSubmit) {
            setButtonDisabled(POINTS_ALL);
            setShowText(HIDDEN);
        }
    }, [errorOnSubmit, buttonDisabled]);

    const submitForm = async (data: any) => {
        setButtonDisabled(POINTS_NONE);
        setShowText(BLOCK);

        if (!errorOnSubmit) {
            props.onSubmit(data);
            if (props.location) {
                navigate(props.location);
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
    }, [errorOnSubmit]);

    return (
        <form className={props.classname} onSubmit={handleSubmit(submitForm)}>
            {props.fields &&
                props.fields.map((field, index) => (
                    <div key={index}>
                        {field.controller ? (
                            <div className='my-3'>{field.controller}</div>
                        ) : (
                            <>
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
                                    <TextModel
                                        addons={`${TEXT_SMALL}`}
                                        color={TEXT_RED_600}
                                        content={errors[field.name]?.message}
                                    />
                                )}
                            </>
                        )}
                    </div>
                ))}
            {errorOnSubmit && (
                <TextModel addons="mt-3" color={TEXT_RED_600} content={props.submitError} />
            )}
            {props.children}
            {props.buttonText && (
                <Button classname={`${props.buttonClassname} ${buttonDisabled}`} text={props.buttonText} />
            )}
            <TextModel addons={showText} content={'Carregando...'} />
        </form>
    );
};

export default FormModel;
