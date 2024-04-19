import ChartsContainer from "../Charts/ChartsContainer";
import ContainerStandart from "../Container/ContainerDefault";
import Navbar from "../Navbar/Navbar";
import TransactionsHome from "../Transactions/TransactionsInHome/TransactionsInHome";
import HomeHero from "./components/HomeHero/HomeHero";



export const Home = {

    Root: ContainerStandart,
    Navbar: Navbar,
    Hero: HomeHero,
    Transactions: TransactionsHome,
    Charts: ChartsContainer,

}