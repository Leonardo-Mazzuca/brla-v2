import { Link } from "react-router-dom";
import ContainerModel from "../../types/ContainerModel/ContainerModel";
import Navbar from "../Navbar/Navbar";
import TextModel from "../Text/Text";
import ContainerStandart from "./ContainerDefault";



interface ServiceContainerProps extends ContainerModel {

    path: string;
    linkText: string;

}

const ContainerService: React.FC<ServiceContainerProps> = ({children, path, linkText}) => {


    const link = <Link to={path}><TextModel content = {
        <>
        <i className="fa-regular fa-circle-left mx-2"></i>{linkText}
        </>
    } /></Link>

    return (

        <ContainerStandart className="h-full gap-22">


                <Navbar headerItem = {link}/>
              

                    {children}

              

        </ContainerStandart>

    );
}

export default ContainerService;