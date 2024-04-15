import { ReactNode, useEffect, useState } from "react";
import { useBalance } from "../../../context/BalanceContext";
import { useQuote } from "../../../context/QuoteContext";
import { formatNumberToString } from "../../../service/Formatters/FormatNumber/formatNumber";
import { getCurrencyIMG } from "../../../service/CurrencyService/getCurrencyIMG";
import Heading from "../../Heading/Heading";
import CardLoading from "../../Loading/CardLoading";
import TextModel from "../../Text/Text";
import { FLAG_ICON_SIZE, FLEX, FLEX_1, FLEX_COL, FLEX_ROW, FONT_SEMIBOLD, GAP_DEFAULT, GRAY_GRADIENT, HEIGHT_AUTO, ITEMS_CENTER, JUSTIFY_CENTER, ROUNDED_DEFAULT, TEXT_3X, TEXT_GRAY_400, TEXT_GRAY_600, WIDTH_FULL } from "../../../contants/classnames/classnames";


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
                        ${FLEX} ${FLEX_COL} ${JUSTIFY_CENTER} gap-6 ${FLEX_1} min-h-80 ${HEIGHT_AUTO} py-5`}
                    >
                        <div className={`${FLEX} ${ITEMS_CENTER} ${GAP_DEFAULT} mb-4`}>
                            <img src={item.flag} alt={item.alt} className={FLAG_ICON_SIZE} />
    
                            <TextModel size={TEXT_3X} addons={FONT_SEMIBOLD} content={item.coin} />
    
                        </div>
                        
                        <TextModel color={TEXT_GRAY_400} content={item.text} addons="mb-2" />
                        <Heading size={TEXT_3X} color={TEXT_GRAY_600} content={item.balance} />
                    
                    </div>
                ))
                
            )

            
        }

    },[quoteState.usdc, quoteState.usdt, state.brlBalance, state.usdcBalance, state.usdtBalance])



    return (

        <section className={`${FLEX} lg:flex-row ${FLEX_COL} gap-5 ${WIDTH_FULL}`}>

            {component}
      
        </section>
        
    );
};


export default CardContainer;