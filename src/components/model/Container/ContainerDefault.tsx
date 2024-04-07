import { HEIGHT_AUTO, LARGE_PADDING_X, MEDIUM_PADDING, WIDTH_FULL } from "../../contants/classnames/classnames";
import ContainerModel from "../../types/ContainerModel/ContainerModel";




const ContainerStandart: React.FC<ContainerModel> = ({children, className}) => {


    return (

        <section className={`${WIDTH_FULL} ${MEDIUM_PADDING} 
         md:${LARGE_PADDING_X} ${HEIGHT_AUTO} ${className ?? ''}`}>

            {children}

        </section>

    );



}

export default ContainerStandart;