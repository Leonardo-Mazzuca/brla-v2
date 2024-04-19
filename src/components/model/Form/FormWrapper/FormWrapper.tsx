import { Link } from "react-router-dom";
import Logo from "../../Logo/Logo";
import ContainerForm from "../../Container/ContainerForm";
import { FORM_PADDING, GAP_DEFAULT, HEADING_BLUE_800, ROUNDED_DEFAULT, SHADOW_XL, TEXT_GRAY_400, TEXT_GRAY_500 } from "../../../../contants/classnames/classnames";

interface FormWrapperProps {

    children?: React.ReactNode;
    heading: string;
    withLink?: boolean;
    link?: string;
    headingCenter? : boolean;
    linkText? : string;
    linkCenter?:boolean;

}

const FormWrapper: React.FC<FormWrapperProps> = 
({ children, heading, withLink, link, headingCenter, linkText, linkCenter }) => {

    const backButton = withLink && link ? (

        <Link to={link} className={`flex items-center ${linkCenter && 'justify-center'} 
          text-sm ${TEXT_GRAY_500} ${GAP_DEFAULT} hover:${TEXT_GRAY_400}`}>
            <i className="fa-solid fa-arrow-left"></i>{linkText ? linkText : 'Voltar'}
        </Link>

    ) : null;

    return (

        <ContainerForm>

           
            <Logo />
            
        
            <section className={`flex flex-col
             ${SHADOW_XL} justify-center ${FORM_PADDING} ${GAP_DEFAULT} ${ROUNDED_DEFAULT}`}>

                {backButton}
                <h3 className={`${HEADING_BLUE_800} text-xl font-bold ${headingCenter && 'text-center'}`}>
                    {heading}
                </h3>

                {children}
                
            </section>

        </ContainerForm>
        
    );
}

export default FormWrapper;
