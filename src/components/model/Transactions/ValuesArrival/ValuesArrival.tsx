import React, { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TransactionsActions, useValuesFilter } from "../../../context/TransactionsContext";
import { valuesListingController } from "../../../controller/ValuesListingController/valuesListingController";
import { TransactionMap } from "./transactionsMap";
import Loading from "../../Loading/Loading";
import TextModel from "../../Text/Text";

const ValuesArrival: React.FC = () => {
    
    const [allData, setAllData] = useState<any[]>([]);
    const { dispatch, state } = useValuesFilter();
    const [error, setError] = useState<ReactNode>();
    const location = useLocation();

    
    const fetchData = async () => {

        try {

            let data = await valuesListingController();

            if (state.search) {
                data = data.filter((item: any) => item.title && item.title.toLowerCase().includes(state.search.toLowerCase()));
                
            }

            if (state.searchDate && !isNaN(Date.parse(state.searchDate))) {

                data = data.filter((item: any) => item.createdAt && item.createdAt
                .toLocaleString().substring(0, 10).includes(state.searchDate));
          
            }

            if (location.pathname === '/home') {
                
                data = data.slice(0, 5);
             
            }

            setAllData(data);
   
    
        } catch (error: any) {

            setError(<TextModel content={"Erro ao pegar histórico, tente novamente mais tarde"} />)

            console.error("Erro ao buscar os dados:", error.message);

        }
    };

    useEffect(() => {
        
        fetchData();    

        if(allData) {

            dispatch({
                type: TransactionsActions.setData,
                payload: { data: allData },
            });

        }

    }, [state.search, state.searchDate, location.pathname, dispatch]);


    return (

        <section className="flex flex-col w-full items-center gap-10 py-5 overflow-y-scroll h-auto">

     
                {error ? error : (

                    allData.length > 0 ? (
    
                        allData.map((data: any, index: number) => (
                            <TransactionMap key={index} data={data} />
                        ))
    
                    ) : (
    
                        <Loading text="Carregando dados..." />
                        
                    )

                )}

            

        </section>

    );
};

export default ValuesArrival;
