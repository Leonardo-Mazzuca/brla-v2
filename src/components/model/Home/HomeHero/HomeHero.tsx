
import { ReactNode, useEffect, useState } from "react";
import { formatNumberToString } from "../../../service/Formatters/FormatNumber/formatNumber";
import Heading from "../../Heading/Heading";
import TextModel from "../../Text/Text";
import CardContainer from "./CardContainer";

type HomeHeroProps = {
    
    heading: number;
}


const HomeHero: React.FC<HomeHeroProps> = ({heading}) => {

    const [headingComponent, setHeadingComponent] = useState<ReactNode>();


    useEffect(()=> {

        if(isNaN(heading)) {
            setHeadingComponent(<TextModel content={"Carregando..."} />)
        } else {
            setHeadingComponent(<Heading content={formatNumberToString(heading, 'BRL')} />)
        }

    },[heading])


    return (

        <section className="mt-20 flex flex-col h-auto gap-3">

            <div className="flex flex-wrap items-end gap-5">

                <TextModel content="Balanço total:" />
                {headingComponent}

            </div>

            <CardContainer />
        

        </section>

    );
}

export default HomeHero;