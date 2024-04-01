import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import TextModel from "../Text/Text";


export type CompleteProps = {


    buttonText: string | undefined;
    text:string | null;
    path: string;
    completeMessage: string;
    image?: string;


}


const Completed = ({buttonText, path ,completeMessage ,text} : CompleteProps) => {

    const navigate = useNavigate();

    return (


                 
             <section className="text-center flex flex-col justify-center">

                <img src="/completed-icon.svg" alt="Image of a dolar sign" className="mx-auto h-1/2
                    max-w-full
                     mb-3" />
                <Heading size="text-3xl" content={completeMessage} />

                <TextModel content={text} addons="my-6" />
                <Button text = {buttonText} onClick={()=>navigate(path)} />

            </section>





    );

}

export default Completed;