import { Link } from "react-router-dom";
import { GAP_DEFAULT, TEXT_GRAY_400, TEXT_GRAY_500 } from "../../../../../contants/classnames/classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


type FormButtonProps = {
    link: string;
    inCenter: boolean;
    content: string
}

export const FormButton = ({link, inCenter, content}:FormButtonProps) => {


    return (

        <Link to={link} className={`flex items-center ${inCenter && 'justify-center'} 
        text-sm ${TEXT_GRAY_500} ${GAP_DEFAULT} hover:${TEXT_GRAY_400}`}>

         <FontAwesomeIcon icon={faArrowLeft}/> {content ? content : 'Voltar'}

        </Link>
        
    );

}