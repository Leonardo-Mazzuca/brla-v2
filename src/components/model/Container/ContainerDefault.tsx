import ContainerModel from "../../types/ContainerModel/ContainerModel";




const ContainerStandart: React.FC<ContainerModel> = ({children, className}) => {


    return (

        <section className={`w-full py-14 md:px-28 lg:px-48 p-3 flex flex-col justify-between h-auto ${className}`}>

            {children}

        </section>

    );



}

export default ContainerStandart;