
import DepositItems from "./DepositItems/DepositItems";
import ContainerService from "../Container/ContainerService";



const Deposit: React.FC = () => {


    return (
        
        <ContainerService path="/Home" linkText="Dashboard">
            <DepositItems />
        </ContainerService>
        
    );
}

export default Deposit;