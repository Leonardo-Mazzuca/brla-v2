
import Logo from "../Logo/Logo";
import { useEffect } from "react";
import { DATA_SAVED } from "../../../contants/sessionStorageKeys/sessionStorageKeys";
import { useDataSaver } from "./hooks/useDataSaver";
import { Home } from ".";

const HomeModel = () => {

  const {fetchSessionStorageData, fetchAllData, chartData, totalBalance} = useDataSaver();


  useEffect(() => {


    fetchAllData();


  },[fetchAllData]);

  useEffect(()=> {

    const isDataSaved = sessionStorage.getItem(DATA_SAVED);
    
      if(!isDataSaved) {

        fetchSessionStorageData();
      
      }

  },[fetchSessionStorageData]);


  return (


    <Home.Root>

      <Home.Navbar headerItem={<Logo />} />

      <Home.Hero heading={totalBalance}/>

      <Home.Transactions />
      

      <Home.Charts data={chartData} />

    </Home.Root>
    

  );

};

export default HomeModel;
