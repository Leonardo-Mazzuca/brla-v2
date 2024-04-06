
import { FLEX, FLEX_COL, FORM_WIDTH, ITEMS_CENTER, JUSTIFY_CENTER, LARGE_PADDING, MEDIUM_PADDING } from "../../contants/classnames/classnames";
import ContainerModel from "../../types/ContainerModel/ContainerModel";



const ContainerForm: React.FC<ContainerModel> = ({children}) => {

    return (



            <section 
            
            className={`${FLEX} md:${JUSTIFY_CENTER} ${ITEMS_CENTER}
             ${FLEX_COL} ${MEDIUM_PADDING} md:${LARGE_PADDING}`}>

                    <div className={`md:${FORM_WIDTH}`}>
                        {children}
                    </div>

            </section>


    );

}

export default ContainerForm;