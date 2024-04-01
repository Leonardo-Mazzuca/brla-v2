import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginView from "../components/view/LoginView/LoginView";
import RegisterDataView from "../components/view/RegisterView/FormStep1View";
import RegisterAdressView from "../components/view/RegisterView/FormStep2View";
import ConfirmEmailView from "../components/view/RegisterView/FormStep3View";
import CreatePassView from "../components/view/RegisterView/FormStep4View";
import HomeView from "../components/view/HomeView/HomeView";
import TransactionsView from "../components/view/TransactionsView/TransactionsView";
import DepositView from "../components/view/DepositView/DepositView";
import PixView from "../components/view/DepositView/PixView";
import PolygonView from "../components/view/DepositView/PolygonView";
import ConversionStep1View from "../components/view/ConversionView/ConversionStep1View";
import ConversionStep2View from "../components/view/ConversionView/ConversionStep2View";
import TransferStep1View from "../components/view/TransferView/TransferStep1View";
import TransferStep3View from "../components/view/TransferView/TransferStep3VIew";
import TransferStep2View from "../components/view/TransferView/TransferStep2View";



const AppRoutes = () => {
    return (
        <BrowserRouter>

            <Routes>
                
                <Route path="/" element = {<LoginView />}/>
                <Route path="/step1" element = {<RegisterDataView />}/>
                <Route path="/step2" element = {<RegisterAdressView />}/>
                <Route path="/step3" element = {<ConfirmEmailView />}/>
                <Route path="/step4" element = {<CreatePassView />}/>
                
                <Route path="/home" element = {<HomeView />}/>
                <Route path="/transactions" element = {<TransactionsView />}/>
                <Route path="/deposit" element = {<DepositView />}/>
                <Route path="/deposit/pix" element = {<PixView />}/>
                <Route path="/deposit/polygon" element = {<PolygonView />}/>

                <Route path="/transfer/1" element = {<TransferStep1View />}/>

                <Route path="/transfer/2" element = {<TransferStep2View />}/>
                
                <Route path="/transfer/3" element = {<TransferStep3View />}/>

                <Route path="/convert/1" element = {<ConversionStep1View />}/>
                <Route path="/convert/2" element = {<ConversionStep2View />}/>
               X


                
            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes;