import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DEFAULT_PATH, NOT_FOUND_PATH, REGISTER_1, REGISTER_2, REGISTER_3, REGISTER_4, TO_CONVERT_1, TO_CONVERT_2, TO_DEPOSIT, TO_DEPOSIT_PIX, TO_DEPOSIT_POLYGON, TO_HOME, TO_TRANSACTIONS, TO_TRANSFERS_1, TO_TRANSFERS_2, TO_TRANSFERS_3 } from "./contants/Paths/paths";
import LoginView from "./view/LoginView/LoginView";
import RegisterDataView from "./view/RegisterView/FormStep1View";
import RegisterAdressView from "./view/RegisterView/FormStep2View";
import ConfirmEmailView from "./view/RegisterView/FormStep3View";
import CreatePassView from "./view/RegisterView/FormStep4View";

import TransactionsView from "./view/TransactionsView/TransactionsView";
import DepositView from "./view/DepositView/DepositView";
import PixView from "./view/DepositView/PixView";
import PolygonView from "./view/DepositView/PolygonView";
import TransferStep1View from "./view/TransferView/TransferStep1View";
import TransferStep2View from "./view/TransferView/TransferStep2View";
import TransferStep3View from "./view/TransferView/TransferStep3VIew";
import ConversionStep1View from "./view/ConversionView/ConversionStep1View";
import ConversionStep2View from "./view/ConversionView/ConversionStep2View";
import { NotFoundView } from "./view/NotFoundView/NotFoundView";
import HomeView from "./view/HomeView/HomeView";


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