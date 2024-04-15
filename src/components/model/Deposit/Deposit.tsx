
import DepositItems from "./DepositItems/DepositItems";
import ContainerService from "../Container/ContainerService";
import { TO_HOME } from "../../contants/Paths/paths";



const Deposit: React.FC = () => {


    return (
        
        <ContainerService path={TO_HOME} linkText="Dashboard">
            <DepositItems />
        </ContainerService>
        
    );
}

export default Deposit;