import { useNavigate } from "react-router-dom";
import Heading from "../../Heading/Heading";
import TextModel from "../../Text/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


type CardConfig = {

    text: string;
    image: string;
    title: string;
    path: string;

}


const DepositCard = ({text, image, title, path}: CardConfig) => {

    const navigate = useNavigate();

    return (

        <div
         className="border border-gray-200 rounded-lg flex items-center justify-between gap-5 w-full p-5 py-10 group hover:shadow-xl hover:transition-all cursor-pointer"
         onClick={() => navigate(path)}
         >

            <div className="text-start flex items-center">


                <img src={image} alt="Icon image" className="mx-2 w-16" />
                
                <div>
                    <Heading size="text-3xl" content={title} />
                    <TextModel content={text} />
                </div>

            </div>
            <div className="group-hover:opacity-100 opacity-50 transition-opacity text-4xl">
                <FontAwesomeIcon icon={faArrowRight} />
            </div>
        </div>

    );

}

export default DepositCard;