
import ContainerModel from "../../types/ContainerModel/ContainerModel";



const ContainerForm: React.FC<ContainerModel> = ({children}) => {

    return (

        <section 
        
        className="flex flex-col w-full items-center justify-center gap-10 md:px-2 px-3 lg:px-0">

                {children}


        </section>

    );

}

export default ContainerForm;