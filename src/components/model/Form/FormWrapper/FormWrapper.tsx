import { Link } from "react-router-dom";
import Logo from "../../Logo/Logo";
import ContainerForm from "../../Container/ContainerForm";
import { FLEX, FLEX_COL, FONT_BOLD, FORM_PADDING, GAP_DEFAULT, HEADING_BLUE_800, ITEMS_CENTER, 
    JUSTIFY_CENTER, MARGIN_X_AUTO, MARGIN_Y_3, ROUNDED_DEFAULT, SHADOW_XL, TEXT_CENTER, TEXT_GRAY_400, TEXT_GRAY_500, TEXT_SMALL, TEXT_XL } from "../../../contants/classnames/classnames";

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

        <Link to={link} className={`${FLEX} ${ITEMS_CENTER} ${linkCenter && JUSTIFY_CENTER} 
          ${TEXT_SMALL} ${TEXT_GRAY_500} ${GAP_DEFAULT} hover:${TEXT_GRAY_400}`}>
            <i className="fa-solid fa-arrow-left"></i>{linkText ? linkText : 'Voltar'}
        </Link>

    ) : null;

    return (

        <ContainerForm>

           
            <Logo />
            
        
            <section className={`${FLEX} ${FLEX_COL} 
             ${SHADOW_XL} ${JUSTIFY_CENTER} ${FORM_PADDING} ${GAP_DEFAULT} ${ROUNDED_DEFAULT}`}>

                {backButton}
                <h3 className={`${HEADING_BLUE_800} ${TEXT_XL} ${FONT_BOLD} ${headingCenter && TEXT_CENTER}`}>
                    {heading}
                </h3>

                {children}
                
            </section>

        </ContainerForm>
        
    );
}

export default FormWrapper;
