import { Link } from "react-router-dom";
import Logo from "../../Logo/Logo";
import ContainerForm from "../../Container/ContainerForm";

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
         my-3 text-2xl text-gray-500 gap-2 hover:text-gray-400`}>
            <i className="fa-solid fa-arrow-left"></i>{linkText ? linkText : 'Voltar'}
        </Link>
    ) : null;

    return (

        <ContainerForm>
            
            <Logo />

            <section className="flex flex-col mx-auto w-full xl:w-2/4
             shadow-xl h-auto md:p-5 lg:p-14 px-3 rounded">

                {backButton}
                <h3 className={`text-heading-blue-800 text-3xl my-3 font-bold ${headingCenter && 'text-center'}`}>
                    {heading}
                </h3>
                {children}
                
            </section>

        </ContainerForm>
        
    );
}

export default FormWrapper;
