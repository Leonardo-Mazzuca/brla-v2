
import MiniContainer from "../../Container/MiniContainer"
import Heading from "../../Heading/Heading";
import TextModel from "../../Text/Text";
import DepositCard from "./DepositCard";



const cardLinks = [

    {text: 'Envie o valor que desejar', image: '/qrcode.svg', title: 'PIX',  path : '/deposit/pix'},
    {text: 'BRLA E USDT apenas.', image: '/polligon.svg', title: 'Endereço Polygon', path : '/deposit/polygon'},

];


const DepositItems: React.FC = () => {

    return (

        <MiniContainer >
            <Heading size="text-4xl" content = "Saldo na sua conta em instântes!" />
            
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