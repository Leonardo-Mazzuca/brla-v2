import { Link } from "react-router-dom";
import Heading from "../../Heading/Heading";
import TextModel from "../../Text/Text";
import TransactionProps from "../../../types/Transactions/TransactionsProps";



const MiniMenu: React.FC<TransactionProps> = ({linkIsEnable, children,headingColReverse,linkPath, linkContent, classname}) => {


    return (
        <>
        
        <div className="flex justify-between items-center flex-wrap gap-5">

            <div className={`flex ${headingColReverse ? 'lg:flex-col-reverse': 'lg:flex-col'}
             items-end md:items-start justify-between w-full lg:w-auto flex-wrap gap-5 ${classname}`}>

                <Heading content = "Transações" />

                {linkIsEnable && <Link to={linkPath ?? '/Transactions'}>
                    
                    <TextModel
                    addons="hover:underline hover:text-gray-400 flex-1"

                    content = { linkContent }

                    />
                    
                </Link>}

            </div>

         
             {children}

        </div>

        <hr className="mt-10" />

    </>

    );
}

export default MiniMenu;