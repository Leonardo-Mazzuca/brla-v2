import ContainerModel from "../../types/ContainerModel/ContainerModel";



const MiniContainer: React.FC<ContainerModel> = ({children}) => {


    return (

        <section className={`mx-auto xl:px-24
        flex w-full flex-col pb-10 gap-8 xl:w-4/6 h-screen md:justify-center`}>

            {children}

        </section>
        
    );
}

export default MiniContainer;