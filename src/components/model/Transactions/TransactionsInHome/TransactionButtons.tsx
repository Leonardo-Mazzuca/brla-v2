import { ReactNode, useEffect, useState } from "react";
import IconButton from "../../Button/IconButton";
import TextModel from "../../Text/Text";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FLEX, FLEX_COL, FLEX_WRAP, GAP_DEFAULT, ITEMS_CENTER, JUSTIFY_BETWEEN, POINTS_ALL, POINTS_NONE, TEXT_GRAY_800, WIDTH_AUTO, WIDTH_FULL } from "../../../contants/classnames/classnames";

interface TransactionItemProps {
    content: string;
    icon: ReactNode;
    link: string;
    classname: string;
}




const TransactionButtons: React.FC = () => {

    const [buttonClassname, setButtonClassname] = useState(POINTS_NONE);


    useEffect(()=> {

        setTimeout(()=> {
            setButtonClassname(POINTS_ALL)
        },8000);


    },[buttonClassname]);

    const transactionItems: TransactionItemProps[] = [

        {content: 'Depositar', icon: <FontAwesomeIcon icon={faPlus}/>, link: '/deposit', classname: buttonClassname},
        {content: 'Transferir', icon: <FontAwesomeIcon icon={faArrowUp}/>, link: '/transfer/1', classname: buttonClassname},
        {content: 'Converter', icon: <FontAwesomeIcon icon={faArrowRightArrowLeft}/>, link: '/convert/1', classname: buttonClassname},
    
    ]

    const navigate = useNavigate();

    return (
        <section 
        className={`${FLEX} ${ITEMS_CENTER}
        gap-12 ${FLEX_WRAP} lg:${WIDTH_AUTO} ${WIDTH_FULL} ${JUSTIFY_BETWEEN}`}>
        

             {transactionItems.map((item,index)=> {

                return (
                <div className={`${FLEX} ${FLEX_COL} ${ITEMS_CENTER} ${GAP_DEFAULT}`} key={index}>

                    <IconButton classname={`${WIDTH_FULL} md:${WIDTH_AUTO} ${item.classname}`} text = {item.icon}
                     onClick={() => navigate(item.link)} />

                    <TextModel color={TEXT_GRAY_800} content = {item.content} />
                    
                </div>
                );

             })}
            


        </section>
    )
};

export default TransactionButtons;