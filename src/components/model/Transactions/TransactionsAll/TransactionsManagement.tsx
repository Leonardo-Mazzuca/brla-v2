import { faArrowUpFromBracket, faCalendar, faSearch } from "@fortawesome/free-solid-svg-icons";
import { TransactionsActions, useValuesFilter } from "../../../context/TransactionsContext";
import exportData from "../../../service/ExportData/exportData";
import formatDate from "../../../service/Formatters/FormatDate/formatDate";
import { Field } from "../../../types/Field/Field";
import InputModel from "../../Input/InputModel";
import { BUTTON_PADDING, DEFAULT_TEXT_SIZE, FLEX, FLEX_COL, FLEX_ROW, FONT_SEMIBOLD, GAP_DEFAULT, JUSTIFY_BETWEEN, MARGIN_X_AUTO, ROUNDED_DEFAULT, TEXT_GRAY_500, WIDTH_FULL } from "../../../contants/classnames/classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TransactionsManagement: React.FC = () => {
    
    const { state, dispatch } = useValuesFilter();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let search = e.target.value;
        dispatch({
            type: TransactionsActions.setSearch,
            payload: { search }
        });
    };

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
        
        <section className={`${FLEX} ${JUSTIFY_BETWEEN} ${GAP_DEFAULT} md:${FLEX_ROW} ${FLEX_COL}`}>
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

            <button className={`${MARGIN_X_AUTO} shadow-lg bg-transparent
              text-start ps-6 block ${FONT_SEMIBOLD} placeholder:${DEFAULT_TEXT_SIZE} ${DEFAULT_TEXT_SIZE}
             ${TEXT_GRAY_500} ${WIDTH_FULL}
             ${ROUNDED_DEFAULT} transition duration-300 ease-in-out hover:bg-black hover:text-white ${BUTTON_PADDING}`}

                onClick={() => exportData(state)}
                >
                <FontAwesomeIcon icon={faArrowUpFromBracket} /> Export
            </button>

        </section>
    );
}

export default TransactionsManagement;
