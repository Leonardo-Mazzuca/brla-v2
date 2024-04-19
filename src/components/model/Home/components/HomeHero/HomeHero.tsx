
import { ReactNode, useEffect, useState } from "react";

import Heading from "../../../Heading/Heading";
import TextModel from "../../../Text/Text";
import CardContainer from "../CardsContainer/CardContainer";

import { GAP_DEFAULT } from "../../../../../contants/classnames/classnames";
import { formatNumberToString } from "../../../../../functions/Formatters/FormatNumber/formatNumber";

type HomeHeroProps = {
    
    heading: number;
}


const HomeHero: React.FC<HomeHeroProps> = ({heading}) => {

    const [headingComponent, setHeadingComponent] = useState<ReactNode>();


    useEffect(()=> {

        if(isNaN(heading)) {
            setHeadingComponent(<TextModel content={"Carregando..."} />)
        } else {
            setHeadingComponent(<Heading size={'text-3xl'} content={formatNumberToString(heading, 'BRL')} />)
        }

    },[heading])


    return (

        <section className={`flex-col h-auto ${GAP_DEFAULT}`}>

            <div className={`flex flex-wrap items-end ${GAP_DEFAULT}`}>

                <TextModel content="Balanço total:" />
                {headingComponent}

            </div>

            <CardContainer />
        

        </section>

    );
}

export default HomeHero;