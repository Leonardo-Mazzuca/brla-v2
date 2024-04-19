import { ReactNode } from "react";
import { WebSocketProvider } from "./WebSocket/WebSocketContext";
import { QuoteProvider } from "./Quote/QuoteContext";
import { BalanceProvider } from "./Balance/BalanceContext";
import { TransactionsProvider } from "./Transactions/TransactionsContext";
import { CurrencyProvider } from "./Currency/CurrencyContext";
import { FormProvider } from "./Register/FormContext";




const AppProvider = ({children}:{children: ReactNode}) => {


  return (

      <WebSocketProvider>

      <QuoteProvider>

        <BalanceProvider>

          <TransactionsProvider>  

                <CurrencyProvider>

                        <FormProvider>

                                  {children}
                  
                        </FormProvider>

                </CurrencyProvider>

          </TransactionsProvider>

        </BalanceProvider>

      </QuoteProvider>


      </WebSocketProvider>

  );


}

export default AppProvider;