import TransactionButtons from "./TransactionButtons";
import MiniMenu from "../MiniMenu/MiniMenu";
import ValuesArrival from "../ValuesArrival/ValuesArrival";


const TransactionsHome = () => {


    
    const linkContent = <>

        Ver todas
        <i className="fa-solid fa-arrow-up-right-from-square ms-3"></i>

    </>;


    return (
        
        <section className="my-10">
        
            <MiniMenu 

            linkPath={'/Transactions'} 
            headingColReverse ={true} 
            linkIsEnable={true}
            children = {<TransactionButtons />} 
            linkContent = {linkContent}

            />

            <ValuesArrival
            
            
            />

        </section>
    );
}

export default TransactionsHome;