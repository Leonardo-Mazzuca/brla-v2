import React, { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TransactionsActions, useValuesFilter } from "../../../../context/Transactions/TransactionsContext";
import { TransactionMap } from "./transactionsMap";
import Loading from "../../Loading/Loading";
import TextModel from "../../Text/Text";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { TO_HOME } from "../../../../contants/Paths/paths";
import { valuesListingController } from "../../../../controller/ValuesListingController";
import { LOG_SIZE } from "../../../../contants/divisionValues/divisionValues";


const ValuesArrival: React.FC = () => {
    const [allData, setAllData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1); 
    const {dispatch, state } = useValuesFilter();
    const [error, setError] = useState<ReactNode>();
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();
    const [chunks, setChunks] = useState<any[]>([]);

    const fetchData = async () => {

        try {

            let data:any[] = await valuesListingController();
            
            if (location.pathname === TO_HOME) {
                data = data.slice(0, 5);
            }

            if(data.length === 0) {
                setError(

                    <TextModel
                        content={'Nenhum dado registrado'}
                    />
                );
            }
                
            setAllData(data);
            setLoading(false);

            

        } catch (error: any) {

            setError(

                <TextModel
                    content={`Erro ao pegar histórico, tente novamente mais tarde ${error.message || error.data?.message}`}
                />
            );

            setLoading(false);
        }

    };

    useEffect(() => {

        fetchData();
        
    }, []);
    

    useEffect(() => {

        let newData = allData;
        if (state.searchDate && !isNaN(Date.parse(state.searchDate))) {
            newData = allData.filter(
                (item: any) => item.createdAt && item.createdAt.substring(0, 10).includes(state.searchDate)
            );
        }
        setFilteredData(newData);

    }, [state.searchDate, allData]);

    useEffect(() => {

        dispatch({
            type: TransactionsActions.setData,
            payload: { data: filteredData },
        });
        
    }, [dispatch, filteredData]);

    useEffect(() => {
        const chunks = [];
        for (let i = 0; i < filteredData.length; i += LOG_SIZE) {
            chunks.push(filteredData.slice(i, i + LOG_SIZE));
        }
        setChunks(chunks);
    }, [filteredData]);

    return (
        <section className="flex flex-col w-full items-center gap-10 py-5 overflow-y-scroll h-auto">

            {error ? (
                error
            ) : loading ? (
                <Loading text="Carregando dados..." />
            ) : filteredData.length > 0 ? (

                <section className="w-full">
                    {chunks.length > 1 && location.pathname !== '/home' ? (
                        <Swiper 
                            className="w-full h-full swiper-wrapper"
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true, type: 'bullets' }} 
                            grabCursor={true}
                            onSlideChange={(swiper: any) => setCurrentPage(swiper.activeIndex + 1)}
                        >
                            {chunks.map((chunk: any[], index: number) => (
                                <SwiperSlide key={index}>
                                    {chunk.map((data: any, dataIndex: number) => (
                                        <TransactionMap key={dataIndex} data={data} />
                                    ))}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        filteredData.map((data: any, index: number) => (
                            <TransactionMap key={index} data={data} />
                        ))
                    )}
                </section>

            ) : (
                <TextModel content="Nenhum dado encontrado" />
            )}

        </section>
    );
};

export default ValuesArrival;


