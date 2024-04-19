import { FORM_WIDTH, MIN_FORM_HEIGHT } from "../../../contants/classnames/classnames";
import { ContainerModel } from "./ContainerDefault";



const ContainerForm: React.FC<ContainerModel> = ({children}) => {

    return (



            <section 
            
            className={`flex justify-center items-center
             flex-col ${MIN_FORM_HEIGHT} p-5 md:p-8`}>

                    <div className={`${FORM_WIDTH}`}>
                        {children}
                    </div>

            </section>


    );

}

export default ContainerForm;