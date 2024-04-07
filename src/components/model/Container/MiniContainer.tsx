import { FLEX, FLEX_COL, ITEMS_CENTER } from "../../contants/classnames/classnames";
import ContainerModel from "../../types/ContainerModel/ContainerModel";



const MiniContainer: React.FC<ContainerModel> = ({children}) => {


    return (

        <section className={`${FLEX} ${ITEMS_CENTER} ${FLEX_COL}`}>

                <div className={`w-full lg:w-1/2`}>
                    {children}
                </div>
      

        </section>
        
    );
}

export default MiniContainer;