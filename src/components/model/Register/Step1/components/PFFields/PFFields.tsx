import { Controller } from "react-hook-form";
import { TEXT_RED_600 } from "../../../../../../contants/classnames/classnames";
import InputModel, { Field } from "../../../../Input/InputModel/InputModel";
import TextModel from "../../../../Text/Text";
import { RegisterFieldProps } from "../../@types/RegisterFieldsProps";
import { Register1State } from "../../context/Register1Context";
import { countries } from "../../../../../../contants/Countries/countries";
import Select from 'react-select';
import { InputDate } from "../../../../Input/InputDate/InputDate";
import { useTranslation } from "react-i18next";
import { useCountry } from "../Register1Form/hooks/useCountry";



interface PFFieldsProps extends RegisterFieldProps<Register1State>{

    fields: Field[]
    
}

export const PFFields = ({fields,register, errors, control}:PFFieldsProps) => {


    const {setCountry} = useCountry();
    const {t, i18n} = useTranslation();

    
    return (<>

    {fields.map((item, index) => {

        return (

          <div key={index}>

              <InputModel 

              {...item}

              />

              {errors[item.name as keyof Register1State] && (

              <TextModel
                  addons={`text-sm`}
                  color={TEXT_RED_600}
                  content={errors[item.name as keyof Register1State]?.message}
              />

              )}
            
          </div>

        );

      })} 

      <div className="flex flex-col my-3">

        <InputDate 
        control={control} 
        label="Data de aniversário" 
        name="birthDate" 
        />

        
        {errors.birthDate && <TextModel
                  addons={`text-sm`}
                  color={TEXT_RED_600}
                  content={errors.birthDate?.message}
              />} 

      </div>

      <div className="my-3 flex-col flex">


        <Controller
        control={control}
        {...register('country')} 
        rules={{required:true}}
        render={({ field }) => (

        <Select
            options={countries}
            isSearchable
            ref={field.ref}
            placeholder={t('País')}
            onChange={value => {

                if(value){
                  setCountry(value?.label)
                }
         

                field.onChange(value?.label)
            }}
           
        />

        )}

        /> 

        {errors.country && <TextModel
                  addons={`text-sm`}
                  color={TEXT_RED_600}
                  content={errors.country.message}
              />}


      </div>

     </>)


}