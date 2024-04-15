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
import { NotFoundView } from "../components/view/NotFoundView/NotFoundView";
import { DEFAULT_PATH, NOT_FOUND_PATH, REGISTER_1, REGISTER_2, REGISTER_3, REGISTER_4, TO_CONVERT_1, TO_CONVERT_2, TO_DEPOSIT, TO_DEPOSIT_PIX, TO_DEPOSIT_POLYGON, TO_HOME, TO_TRANSACTIONS, TO_TRANSFERS_1, TO_TRANSFERS_2, TO_TRANSFERS_3 } from "../components/contants/Paths/paths";



const AppRoutes = () => {

    return (

        <BrowserRouter>

            <Routes>
                
                <Route path={DEFAULT_PATH} element = {<LoginView />}/>
                
                <Route path={REGISTER_1} element = {<RegisterDataView />}/>
                <Route path={REGISTER_2} element = {<RegisterAdressView />}/>
                <Route path={REGISTER_3} element = {<ConfirmEmailView />}/>
                <Route path={REGISTER_4} element = {<CreatePassView />}/>
                
                <Route path={TO_HOME} element = {<HomeView />}/>
                <Route path={TO_TRANSACTIONS} element = {<TransactionsView />}/>
                <Route path={TO_DEPOSIT} element = {<DepositView />}/>
                <Route path={TO_DEPOSIT_PIX} element = {<PixView />}/>
                <Route path={TO_DEPOSIT_POLYGON} element = {<PolygonView />}/>

                <Route path={TO_TRANSFERS_1} element = {<TransferStep1View />}/>

                <Route path={TO_TRANSFERS_2} element = {<TransferStep2View />}/>
                
                <Route path={TO_TRANSFERS_3} element = {<TransferStep3View />}/>

                <Route path={TO_CONVERT_1} element = {<ConversionStep1View />}/>
                <Route path={TO_CONVERT_2} element = {<ConversionStep2View />}/>

                <Route path={NOT_FOUND_PATH} element= {<NotFoundView />} />
                
            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes;