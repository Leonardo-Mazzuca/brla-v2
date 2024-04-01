import { faCheck, faMoneyBill, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";





type ProgressBarConfig = {

    IsSecondVisible: boolean;
    activeIndex: number;

}


const ProgressBar: React.FC<ProgressBarConfig> = ({IsSecondVisible,activeIndex}) => {


    return(

            <ol className="flex items-center w-full">

                <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-black after:border-4 after:inline-block dark:after:border-black">

                    <span className={`flex text-white items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 ${activeIndex === 0 ? 'bg-black dark:bg-black' : 'bg-gray-400 dark:bg-gray-400' }`}>
                        <FontAwesomeIcon icon={faMoneyBill} />
                    </span>

                </li>

                {IsSecondVisible &&
                
                    <li className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b ${activeIndex === 2 ? ' after:border-gray-700' : ' after:border-gray-100'}
                     after:border-4 after:inline-block dark:after:border-gray-700`}>

                        <span className={`flex text-white items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 ${activeIndex === 1 ? 'bg-black dark:bg-black' : 'bg-gray-400 dark:bg-gray-400' }  `}>
                             <FontAwesomeIcon icon={faUser} />
                        </span>

                    </li>
                
                }

                <li>

                    <span className={`flex text-white items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 ${activeIndex === 2 ? 'bg-black dark:bg-black' : 'bg-gray-400 dark:bg-gray-400' }  `}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>

                </li>

            </ol>

    )
}

export default ProgressBar;