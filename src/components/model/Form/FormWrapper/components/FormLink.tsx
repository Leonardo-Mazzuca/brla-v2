
import { Link } from "react-router-dom";
import { GAP_DEFAULT, TEXT_GRAY_400, TEXT_GRAY_500 } from "../../../../../contants/classnames/classnames";

type FormLinkProps = {

    content?:string;
    path: string;
    inCenter?: boolean;

}


export const FormLink = ({inCenter,content,path}:FormLinkProps) => {


    return (
    <Link to={path} className={`flex items-center ${inCenter && 'justify-center'} 
    text-sm ${TEXT_GRAY_500} ${GAP_DEFAULT} hover:${TEXT_GRAY_400}`}>
      <i className="fa-solid fa-arrow-left"></i>{content ? content : 'Voltar'}
    </Link>
  )


}