

import AppRoutes from "./client/routes";
import { BalanceProvider } from "./components/context/BalanceContext";
import { CurrencyProvider } from "./components/context/CurrencyContext";
import { FormProvider } from "./components/context/FormContext";
import { TransactionsProvider } from "./components/context/TransactionsContext";
import { QuoteProvider } from "./components/context/QuoteContext";
import { WebSocketProvider } from "./components/context/WebSocketContext";




function App() {


  return (

    <section className="mn-w-screen min-h-screen">

          <WebSocketProvider>

          <QuoteProvider>
  
            <BalanceProvider>

              <TransactionsProvider>  

                    <CurrencyProvider>

                            <FormProvider>

                                    <AppRoutes />
                      
                             </FormProvider>

                     </CurrencyProvider>

               </TransactionsProvider>

            </BalanceProvider>

          </QuoteProvider>


          </WebSocketProvider>
      

    </section>

  );
}

export default App;
