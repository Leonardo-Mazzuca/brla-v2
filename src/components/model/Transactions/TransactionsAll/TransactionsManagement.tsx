import { faArrowUpFromBracket, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { TransactionsActions, useValuesFilter } from "../../../../context/Transactions/TransactionsContext";

import InputModel, { Field } from "../../Input/InputModel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import exportData from "../../../../functions/ExportData/exportData";
import { BUTTON_PADDING, DEFAULT_TEXT_SIZE, GAP_DEFAULT, ROUNDED_DEFAULT, TEXT_GRAY_500 } from "../../../../contants/classnames/classnames";
import formatDate from "../../../../functions/Formatters/FormatDate/formatDate";

const TransactionsManagement: React.FC = () => {
    
    const { state, dispatch } = useValuesFilter();


    const handleSearchDate = (e: React.ChangeEvent<HTMLInputElement>) => {

        let searchDate = e.target.value;

        let date = new Date(searchDate);

        date.setDate(date.getDate() + 1); 

        const formattedDate = formatDate(String(date)).substring(0,10);

        dispatch({
            type: TransactionsActions.setSearchDate,
            payload: { searchDate: formattedDate }
        });

    };
    
    

    const inputConfig: Field[] = [
        { type: 'date', name: 'inputDate', icon: faCalendar, placeholder: "Filtrar por data", addClassName: 'shadow-lg bg-transparent', onChange: handleSearchDate },
    ];

    return (
        
        <section className={`flex justify-between ${GAP_DEFAULT} md:flex-row flex-col`}>
            
            {inputConfig.map((item, index) => {
                return (
                    <div key={index}>
                        <InputModel
                            type={item.type}
                            name={item.name}
                            icon={item.icon}
                            placeholder={item.placeholder}
                            addClassName={item.addClassName}
                            onChange={item.onChange}
                        />
                    </div>
                );
            })}

            <button className={`mx-auto shadow-lg bg-transparent
              text-start ps-6 block font-semibold placeholder:${DEFAULT_TEXT_SIZE} ${DEFAULT_TEXT_SIZE}
             ${TEXT_GRAY_500} w-full ${ROUNDED_DEFAULT} 
             transition duration-300 ease-in-out hover:bg-black hover:text-white ${BUTTON_PADDING}`}

                onClick={state.data.length > 0 ? () => exportData(state) : ()=> {}}
                >
                <FontAwesomeIcon icon={faArrowUpFromBracket} /> Export
            </button>

        </section>
    );
}

export default TransactionsManagement;
