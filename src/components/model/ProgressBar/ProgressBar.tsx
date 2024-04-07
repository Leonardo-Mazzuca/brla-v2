import { faCheck, faMoneyBill, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FLEX, ITEMS_CENTER, WIDTH_FULL } from "../../contants/classnames/classnames";





type ProgressBarConfig = {

    IsSecondVisible: boolean;
    activeIndex: number;

}


const ProgressBar: React.FC<ProgressBarConfig> = ({IsSecondVisible,activeIndex}) => {

    const DEFAULT_SIZE = 'p-2 w-6 h-6 rounded-full lg:h-9 lg:w-9';


    return(

            <ol className={`${FLEX} ${ITEMS_CENTER} ${WIDTH_FULL} mb-3`}>

                <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-black after:border-4 after:inline-block dark:after:border-black">

                    <span className={`flex text-white items-center justify-center ${DEFAULT_SIZE} ${activeIndex === 0 ? 'bg-black dark:bg-black' : 'bg-gray-400 dark:bg-gray-400' }`}>
                        <FontAwesomeIcon icon={faMoneyBill} />
                    </span>

                </li>

                {IsSecondVisible &&
                
                    <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b ${activeIndex === 2 ? ' after:border-gray-700' : ' after:border-gray-100'}
                     after:border-4 after:inline-block dark:after:border-gray-700`}>

                        <span className={`flex text-white items-center justify-center ${DEFAULT_SIZE} ${activeIndex === 1 ? 'bg-black dark:bg-black' : 'bg-gray-400 dark:bg-gray-400' }  `}>
                             <FontAwesomeIcon icon={faUser} />
                        </span>

                    </li>
                
                }

                <li>

                    <span className={`flex text-white items-center justify-center ${DEFAULT_SIZE} ${activeIndex === 2 ? 'bg-black dark:bg-black' : 'bg-gray-400 dark:bg-gray-400' }  `}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>

                </li>

            </ol>

    )
}

export default ProgressBar;