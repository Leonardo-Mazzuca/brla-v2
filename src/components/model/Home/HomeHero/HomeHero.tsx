
import { ReactNode, useEffect, useState } from "react";
import { formatNumberToString } from "../../../service/Formatters/FormatNumber/formatNumber";
import Heading from "../../Heading/Heading";
import TextModel from "../../Text/Text";
import CardContainer from "./CardContainer";
import { FLEX, FLEX_COL, FLEX_WRAP, GAP_DEFAULT, HEIGHT_AUTO, ITEMS_END, TEXT_3X } from "../../../contants/classnames/classnames";

type HomeHeroProps = {
    
    heading: number;
}


const HomeHero: React.FC<HomeHeroProps> = ({heading}) => {

    const [headingComponent, setHeadingComponent] = useState<ReactNode>();


    useEffect(()=> {

        if(isNaN(heading)) {
            setHeadingComponent(<TextModel content={"Carregando..."} />)
        } else {
            setHeadingComponent(<Heading size={TEXT_3X} content={formatNumberToString(heading, 'BRL')} />)
        }

    },[heading])


    return (

        <section className={`${FLEX_COL} ${FLEX_COL} ${HEIGHT_AUTO} ${GAP_DEFAULT}`}>

            <div className={`${FLEX} ${FLEX_WRAP} ${ITEMS_END} ${GAP_DEFAULT}`}>

                <TextModel content="Balanço total:" />
                {headingComponent}

            </div>

            <CardContainer />
        

        </section>

    );
}

export default HomeHero;