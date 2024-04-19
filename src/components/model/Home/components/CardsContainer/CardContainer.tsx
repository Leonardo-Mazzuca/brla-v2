import { ReactNode, useEffect, useState } from "react";
import { useBalance } from "../../../../../context/Balance/BalanceContext";
import { useQuote } from "../../../../../context/Quote/QuoteContext";

import Heading from "../../../Heading/Heading";
import CardLoading from "../../../Loading/CardLoading";
import TextModel from "../../../Text/Text";
import { getCurrencyIMG } from "../../../../../service/CurrencyService/getCurrencyIMG";
import { FLAG_ICON_SIZE, GRAY_GRADIENT, ROUNDED_DEFAULT, TEXT_GRAY_400, TEXT_GRAY_600 } from "../../../../../contants/classnames/classnames";
import { formatNumberToString } from "../../../../../functions/Formatters/FormatNumber/formatNumber";

interface CardPattern {

    flag: string;
    coin: string;
    text: string;
    balance: string;
    alt: string

}


const CardContainer = () => {

    const {state} = useBalance();

    const {state: quoteState} = useQuote();

    const [component, setCardComponent] = useState<ReactNode>();


    useEffect(()=> {

    const cardItems: CardPattern[] = [

        {flag: getCurrencyIMG('BRL'), alt: "Brazilian flag", coin: "Brazillian Real", text: `BRL 1,00 = USDT ${quoteState.brl?.toUsdt?.toFixed(2)}`, balance: formatNumberToString(state.brlBalance, 'BRL')},
        {flag: getCurrencyIMG('USDC'), alt: "USDC flag", coin: "USD Coin", text: `1.00 USDC = BRL ${quoteState.usdc[0]?.toBrl.toFixed(2)}`, balance: formatNumberToString(state.usdcBalance, 'USD')},
        {flag: getCurrencyIMG('USDT'), alt: "USDT flag", coin: "Tether USDT", text: `1.00 USDT = BRL ${quoteState.usdt[0]?.toBrl.toFixed(2)}`, balance:formatNumberToString(state.usdtBalance, 'USD')},
    
    ];
        
        if(quoteState.usdc.length === 0 || quoteState.usdt.length === 0) {

            setCardComponent(
            
                cardItems.map((_, index) => (
                    <CardLoading key={index} />
                ))
            
            );

        } else {

            setCardComponent(

                cardItems.map((item, index) => (
                
                    <div
    
                        key={index}
                        className={`
                       ${GRAY_GRADIENT} ${ROUNDED_DEFAULT} px-7 
                        flex flex-col justify-center gap-6 flex-1 min-h-80 h-auto py-5`}
                    >
                        <div className={`flex items-center gap-default mb-4`}>
                            <img src={item.flag} alt={item.alt} className={FLAG_ICON_SIZE} />
    
                            <TextModel size={'text-3xl'} addons={'font-semibold'} content={item.coin} />
    
                        </div>
                        
                        <TextModel color={TEXT_GRAY_400} content={item.text} addons="mb-2" />
                        <Heading size={'text-3xl'} color={TEXT_GRAY_600} content={item.balance} />
                    
                    </div>
                ))
                
            )

            
        }

    },[quoteState.usdc, quoteState.usdt, state.brlBalance, state.usdcBalance, state.usdtBalance])



    return (

        <section className={`flex lg:flex-row flex-col gap-5 w-full`}>

            {component}
      
        </section>
        
    );
};


export default CardContainer;