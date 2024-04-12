import ContainerStandart from "../Container/ContainerDefault";
import Logo from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";
import HomeHero from "./HomeHero/HomeHero";
import TransactionsHome from "../Transactions/TransactionsInHome/TransactionsInHome";
import { useEffect, useState } from "react";
import {  useBalance } from "../../context/BalanceContext";
import { useQuote } from "../../context/QuoteContext";
import ChartsContainer from "../Charts/ChartsContainer";
import { ChartData } from "../../types/Chart/ChartData";
import { fetchCoinsData } from "../../service/CoinsService/fetchCoinsData";
import { fetchBalance } from "../../service/BalanceService/fetchBalance";

const Home: React.FC = () => {

  const { state, dispatch, useTotalBalance } = useBalance();
  const { dispatch: quoteDispatch } = useQuote();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const fetchAllData = async () => {

    try {

        await fetchCoinsData(quoteDispatch, setChartData);
        await fetchBalance(dispatch);

    } catch(e:any) {


    }

  }

  useEffect(() => {

    fetchAllData();

  },[]);


  return (

    <ContainerStandart>
      <Navbar headerItem={<Logo />} />
      <HomeHero heading={useTotalBalance(state)} />

      <TransactionsHome />

      <ChartsContainer data={chartData} />

    </ContainerStandart>

  );

};

export default Home;
