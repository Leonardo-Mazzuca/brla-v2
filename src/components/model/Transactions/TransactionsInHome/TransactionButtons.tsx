import { ReactNode } from "react";
import IconButton from "../../Button/IconButton";
import TextModel from "../../Text/Text";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";

interface TransactionItemProps {
    content: string;
    icon: ReactNode;
    link: string;
}


const transactionItems: TransactionItemProps[] = [

    {content: 'Depositar', icon: <FontAwesomeIcon icon={faPlus}/>, link: '/deposit'},
    {content: 'Transferir', icon: <FontAwesomeIcon icon={faArrowUp}/>, link: '/transfer/1'},
    {content: 'Converter', icon: <FontAwesomeIcon icon={faArrowRightArrowLeft}/>, link: '/convert/1'},

]

const TransactionButtons: React.FC = () => {


    const navigate = useNavigate();

    return (
        <section 
        className="flex items-center 
        gap-12 flex-wrap lg:w-auto w-full justify-between">
        

             {transactionItems.map((item,index)=> {

                return (
                <div className="flex flex-col items-center gap-2" key={index}>

                    <IconButton classname="w-full md:w-auto" text = {item.icon}
                     onClick={() => navigate(item.link)} />

                    <TextModel color="gray-800" content = {item.content} />
                    
                </div>
                );

             })}
            


        </section>
    )
};

export default TransactionButtons;