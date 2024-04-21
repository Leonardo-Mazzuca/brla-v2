import { ReactNode } from "react";
import { FORM_PADDING, GAP_DEFAULT, ROUNDED_DEFAULT, SHADOW_XL } from "../../../../../contants/classnames/classnames";



export const FormWrapper = ({children}: {children: ReactNode}) => {

    return (

        
        
        <section className={`flex flex-col
        ${SHADOW_XL} justify-center ${FORM_PADDING} ${GAP_DEFAULT} ${ROUNDED_DEFAULT}`}>

            {children}

        </section>

    )


}