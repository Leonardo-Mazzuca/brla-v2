import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import TextModel from "../Text/Text";
import { DEFAULT_PATH } from "../../../contants/Paths/paths";



export const NotFoundPage = () => {

    const navigate = useNavigate();

    return(

        <section className="flex text-center flex-col items-center justify-center h-screen">

            <div className="mx-auto">

            <Heading addons="my-3" color="green-300" content={"404"}/>
            
            <Heading content={"URL não encontrada"}/>

            <TextModel addons="my-3 text-3xl" content={"A página que você está procurando não existe"} />

            <Button onClick={() => navigate(DEFAULT_PATH)} text = "Voltar" />

            </div>

        </section>

        
    );

}

