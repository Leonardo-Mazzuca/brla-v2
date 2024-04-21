
import  { useState } from "react";
import { DEFAULT_TEXT_SIZE, GAP_DEFAULT, ROUNDED_DEFAULT, TEXT_GRAY_400 } from "../../../../../../contants/classnames/classnames"
import { useTranslation } from "react-i18next";
import { RegisterActions, useRegisterForStep1 } from "../../context/Register1Context";
import { FieldValue, FieldValues, UseFormRegister } from "react-hook-form";




export const PersonTypeCheckBox = ({onClick}:{onClick: ()=> void}) => {

    const { t, i18n} = useTranslation();
    const [personType , setPersonType] = useState('PF');
    const {dispatch} = useRegisterForStep1();

    const handlePersonType = (e:React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.checked;
        // if (personCountry==='BR') {

          if (value) {
            setPersonType('PJ');

            dispatch({
                type:RegisterActions.setIsPJ,
                payload: {isPJ: true}
            });

          } else {

            setPersonType('PF');
                    
            dispatch({
                type:RegisterActions.setIsPJ,
                payload: {isPJ: false}
            });

          }  

        // } else {
        //   setPersonType('REGNUM');
        // }

      }
    

    return (

        <div className={`flex ${GAP_DEFAULT} my-3 md:items-center items-start`}>

            <input
              style={{ width: '1em', height: '1em' }}

              className={`checkbox:h-3/4 bg-gray-50 border border-gray-300 text-gray-900
              text-sm ${ROUNDED_DEFAULT} focus:ring-blue-500 focus:border-blue-500 block
              w-full
              p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
              
              `}
              onClick={onClick}
              onChange={handlePersonType} 
              value={"PJ"}
              type="checkbox"
              id="checkboxInputIsPJ"

            />

            <label htmlFor="checkboxInputIsPJ" 
            className={`flex md:items-center
            flex-wrap ${GAP_DEFAULT} ${TEXT_GRAY_400} text-sm md:${DEFAULT_TEXT_SIZE}`}>

              {t('sou_pj')}

            </label>

          </div>

    );



}