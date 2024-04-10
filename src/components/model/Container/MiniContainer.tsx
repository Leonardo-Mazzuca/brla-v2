import { FLEX, FLEX_COL, ITEMS_CENTER } from "../../contants/classnames/classnames";
import ContainerModel from "../../types/ContainerModel/ContainerModel";



const MiniContainer: React.FC<ContainerModel> = ({children}) => {


    return (

        <section className={`${FLEX} gap-3 ${ITEMS_CENTER} ${FLEX_COL}`}>

                <div className={`flex gap-3 flex-col w-full lg:w-[60%]`}>
                    {children}
                </div>
      

        </section>
        
    );
}

export default MiniContainer;