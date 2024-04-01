import { faCalendar, faSearch } from "@fortawesome/free-solid-svg-icons";
import { TransactionsActions, useValuesFilter } from "../../../context/TransactionsContext";
import exportData from "../../../service/ExportData/exportData";
import formatDate from "../../../service/Formatters/FormatDate/formatDate";
import { Field } from "../../../types/Field/Field";
import InputModel from "../../Input/InputModel";

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
        { type: 'text', name: 'inputSearch', icon: faSearch, placeholder: "Search", onChange: handleSearch },
        { type: 'date', name: 'inputDate', icon: faCalendar, placeholder: "Filtrar por data", addClassName: 'shadow-lg bg-transparent', onChange: handleSearchDate },
    ];

    return (
        
        <section className="flex w-full md:w-auto justify-between gap-5 md:flex-row flex-col">
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

            <button className="mx-auto shadow-lg bg-transparent w-full text-start ps-6 md:w-1/3 block font-semibold placeholder:text-2xl text-2xl text-gray-500 rounded-xl transition duration-300 ease-in-out hover:bg-black hover:text-white py-6"
                onClick={() => exportData(state)}
                >
                <i className="fa-solid fa-arrow-up-from-bracket text-xl text-gray-600"></i> Export
            </button>

        </section>
    );
}

export default TransactionsManagement;
