import ContainerStandart from "../../Container/ContainerDefault";
import TransactionsManagement from "./TransactionsManagement";
import MiniMenu from "../MiniMenu/MiniMenu";
import ValuesArrival from "../ValuesArrival/ValuesArrival";
import { TO_HOME } from "../../../../contants/Paths/paths";



const Transactions: React.FC = () => {

    const linkContent = <>
    
        <i className="fa-solid fa-circle-arrow-left mx-2"></i>
        Voltar
    
     </>;

    return (


                <ContainerStandart>

                        <section className="my-10">

                            <MiniMenu 

                                linkPath={TO_HOME} 
                                headingColReverse ={true} 
                                linkIsEnable={true}
                                children = {<TransactionsManagement />} 
                                linkContent = {linkContent}
                                classname="flex-row-reverse"

                            />

                            <ValuesArrival
                            
                            
                            />

                        </section>

                        
                </ContainerStandart>
                
     

    );

}

export default Transactions;