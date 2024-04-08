import { HEIGHT_AUTO, WIDTH_FULL } from "../../contants/classnames/classnames";
import ContainerModel from "../../types/ContainerModel/ContainerModel";




const ContainerStandart: React.FC<ContainerModel> = ({children, className}) => {


    return (

        <section className={`lg:px-44 lg:py-12 md:px-12 md:py-12 p-6 ${WIDTH_FULL}  ${HEIGHT_AUTO} ${className ?? ''}`}>

            {children}

        </section>

    );



}

export default ContainerStandart;