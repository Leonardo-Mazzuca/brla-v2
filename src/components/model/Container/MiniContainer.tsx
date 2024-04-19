import { ContainerModel } from "./ContainerDefault";


const MiniContainer: React.FC<ContainerModel> = ({children}) => {


    return (

        <section className={`flex gap-3 items-center flex-col`}>

                <div className={`flex gap-3 flex-col w-full max-w-3xl`}>
                    {children}
                </div>
      

        </section>
        
    );
}

export default MiniContainer;