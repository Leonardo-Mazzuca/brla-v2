import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import TextModel from "../Text/Text";
import ContainerStandart, { ContainerModel } from "./ContainerDefault";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";



interface ServiceContainerProps extends ContainerModel {

    path: string;
    linkText: string;

}

const ContainerService: React.FC<ServiceContainerProps> = ({children, path, linkText}) => {


    const link = <Link to={path}><TextModel content = {

        <>
        <FontAwesomeIcon icon={faCircleLeft} className="mx-2" />{linkText}
        </>
        
    } /></Link>



    return (

        <ContainerStandart>

                <Navbar headerItem = {link}/>

                    {children}


        </ContainerStandart>

    );
}

export default ContainerService;