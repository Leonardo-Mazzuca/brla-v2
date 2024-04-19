import { ReactNode } from "react";


export interface ContainerModel {

    children: ReactNode;
    className?: string;
}

const ContainerStandart: React.FC<ContainerModel> = ({children, className}) => {


    return (

        <section className={`xl:px-64 lg:px-32 lg:py-12 md:px-24 md:py-12 p-6 w-full
         h-auto ${className ?? ''}`}>

            {children}

        </section>

    );



}

export default ContainerStandart;