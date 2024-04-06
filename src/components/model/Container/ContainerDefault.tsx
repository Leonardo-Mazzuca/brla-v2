import { FLEX, FLEX_COL, HEIGHT_AUTO, JUSTIFY_BETWEEN, LARGE_PADDING, LARGE_PADDING_X, MEDIUM_PADDING, WIDTH_FULL } from "../../contants/classnames/classnames";
import ContainerModel from "../../types/ContainerModel/ContainerModel";




const ContainerStandart: React.FC<ContainerModel> = ({children, className}) => {


    return (

        <section className={`${WIDTH_FULL} 
        ${FLEX} ${FLEX_COL} ${JUSTIFY_BETWEEN} ${MEDIUM_PADDING} 
         md:${LARGE_PADDING_X} ${HEIGHT_AUTO} ${className}`}>

            {children}

        </section>

    );



}

export default ContainerStandart;