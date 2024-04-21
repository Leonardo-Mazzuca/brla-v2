

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { InputHTMLAttributes } from 'react';
import { Control, Controller } from 'react-hook-form';

interface InputDateProps extends InputHTMLAttributes<HTMLInputElement> {

    control: Control<any, any , any>;
    name: string;
    label: string;

}

export const InputDate = ({control,name, label}:InputDateProps) => {

  

    return (

        <Controller
        control={control}
        name={name}
        rules={{required:true}}

        render={({field}) => {

            return(

                <DatePicker
                label={label}
                
                inputRef={field.ref}
                onChange={(date) => {
                    
                    if (date && typeof date === 'object') {
                    
                        const dateString = date.format('DD-MM-YYYY');
                    
                        field.onChange(dateString);

                    } else {
                        
                        field.onChange(date);
                    }
                }}

                />
            )
        }}

        />

    )


}