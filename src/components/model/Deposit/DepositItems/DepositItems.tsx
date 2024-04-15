
import { TO_DEPOSIT_PIX, TO_DEPOSIT_POLYGON } from "../../../contants/Paths/paths";
import MiniContainer from "../../Container/MiniContainer"
import Heading from "../../Heading/Heading";
import TextModel from "../../Text/Text";
import DepositCard from "./DepositCard";



const cardLinks = [

    {text: 'Envie o valor que desejar', image: '/qrcode.svg', title: 'PIX',  path : TO_DEPOSIT_PIX},
    {text: 'BRLA ,USDC e USDT apenas.', image: '/polligon.svg', title: 'Endereço Polygon', path : TO_DEPOSIT_POLYGON},

];


const DepositItems: React.FC = () => {

    return (

        <MiniContainer >
            <Heading size="text-4xl" content = "Saldo na sua conta em instantes!" />
            
            <TextModel content = "Selecione uma das opções e leia as instruções.  O seu saldo ficará disponível segundos após o envio" />
            
            {cardLinks.map((item, index) => {
                return (
                   <DepositCard {...item} key={index} />
                )
            })}

        </MiniContainer>
    );
}

export default DepositItems;