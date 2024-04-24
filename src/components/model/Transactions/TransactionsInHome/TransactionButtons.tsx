import { ReactNode} from "react";
import IconButton from "../../Button/IconButton";
import TextModel from "../../Text/Text";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { TO_CONVERT_1, TO_DEPOSIT, TO_TRANSFERS_1 } from "../../../../contants/Paths/paths";
import { GAP_DEFAULT, TEXT_GRAY_800 } from "../../../../contants/classnames/classnames";


interface TransactionItemProps {
    content: string;
    icon: ReactNode;
    link: string;
    classname?: string;
}


const TransactionButtons: React.FC = () => {


    const transactionItems: TransactionItemProps[] = [

        {content: 'Depositar', icon: <FontAwesomeIcon icon={faPlus}/>, link: TO_DEPOSIT},
        {content: 'Transferir', icon: <FontAwesomeIcon icon={faArrowUp}/>, link: TO_TRANSFERS_1,},
        {content: 'Converter', icon: <FontAwesomeIcon icon={faArrowRightArrowLeft}/>, link: TO_CONVERT_1,},
    
    ]

    const navigate = useNavigate();

    return (
        <section 
        className={`flex items-center
        gap-12 flex-wrap lg:w-auto w-full justify-between`}>
        

             {transactionItems.map((item,index)=> {

                return (
                <div className={`flex flex-col items-center ${GAP_DEFAULT}`} key={index}>

                    <IconButton classname={`w-full md:w-auto ${item.classname}`} text = {item.icon}
                     onClick={() => navigate(item.link)} />

                    <TextModel color={TEXT_GRAY_800} content = {item.content} />
                    
                </div>
                );

             })}
            


        </section>
    )
};

export default TransactionButtons;