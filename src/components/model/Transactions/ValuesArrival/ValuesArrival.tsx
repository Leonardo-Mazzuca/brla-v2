import React, { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TransactionsActions, useValuesFilter } from "../../../context/TransactionsContext";
import { valuesListingController } from "../../../controller/ValuesListingController/valuesListingController";
import { TransactionMap } from "./transactionsMap";
import Loading from "../../Loading/Loading";
import TextModel from "../../Text/Text";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ValuesArrival: React.FC = () => {
    const [allData, setAllData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1); // Estado para controlar a página atual
    const { dispatch, state } = useValuesFilter();
    const [error, setError] = useState<ReactNode>();
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();

    const fetchData = async () => {
        try {
            let data = await valuesListingController();

            if (location.pathname === '/home') {
                data = data.slice(0, 5);
            }

            setAllData(data);
            setFilteredData(data);
            setLoading(false);
        } catch (error: any) {
            setError(
                <TextModel
                    content={`Erro ao pegar histórico, tente novamente mais tarde ${error.message || error.data?.message}`}
                />
            );
            console.error("Erro ao buscar os dados:", error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [location.pathname]);

    useEffect(() => {
        if (state.searchDate && !isNaN(Date.parse(state.searchDate))) {
            const newData = allData.filter(
                (item: any) => item.createdAt && item.createdAt.substring(0, 10).includes(state.searchDate)
            );
            setFilteredData(newData);
        } else {
            setFilteredData(allData);
        }
    }, [state.searchDate, allData]);

    useEffect(() => {
        dispatch({
            type: TransactionsActions.setData,
            payload: { data: filteredData },
        });
    }, [dispatch, filteredData]);

    return (
        <section className="flex flex-col w-full items-center gap-10 py-5 overflow-y-scroll h-auto">
            {error ? (
                error
            ) : loading ? (
                <Loading text="Carregando dados..." />
            ) : filteredData.length > 0 ? (
                <>
                    {filteredData.length > 100 ? (
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            onSlideChange={(swiper: any) => setCurrentPage(swiper.activeIndex + 1)}
                        >
                            {filteredData.map((data: any, index: number) => (
                                <SwiperSlide key={index}>
                                    <TransactionMap data={data} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        filteredData.map((data: any, index: number) => <TransactionMap key={index} data={data} />)
                    )}
                </>
            ) : (
                <TextModel content="Nenhum dado encontrado" />
            )}
        </section>
    );
};

export default ValuesArrival;
