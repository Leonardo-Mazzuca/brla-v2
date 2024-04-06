

import { useEffect } from "react";
import AppRoutes from "./client/routes";
import { BalanceProvider } from "./components/context/BalanceContext";
import { CurrencyProvider } from "./components/context/CurrencyContext";
import { FormProvider } from "./components/context/FormContext";
import { TransactionsProvider } from "./components/context/TransactionsContext";
import { useWebSocket } from "./components/context/WebSocketContext";
import { QuoteProvider } from "./components/context/QuoteContext";




function App() {


  return (

    <section className="mn-w-screen min-h-screen">

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
      

    </section>

  );
}

export default App;
