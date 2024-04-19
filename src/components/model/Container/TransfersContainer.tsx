import { ReactNode } from "react";
import Button from "../Button/Button";
import MiniContainer from "./MiniContainer";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../ProgressBar/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


type TransferConfig = {

    children: ReactNode;
    location?: string;
    activeIndex: number;
    className?: string;
    buttonControl?: string;
    buttonText?: ReactNode;
    isButtonPresent?: boolean;
    onSubmit?: () => void;
    
}

const TransfersContainer:React.FC<TransferConfig> = (
    {children,location,activeIndex, className, buttonControl, buttonText, isButtonPresent = true, onSubmit}) => {

    const navigate = useNavigate();

    const defaultButtonText = (
        <>
        Próximo
        <FontAwesomeIcon className="ms-2" icon={faArrowRight} />
        </>
    );

    const handleSubmit = () => {

        if(location) {
            navigate(location);
        }

        if(onSubmit) {
            onSubmit();
        }

    }

    return (
        
        <MiniContainer className={className}>

            <div className="md:mx-auto md:w-[70%]">
             <ProgressBar activeIndex={activeIndex} IsSecondVisible />
            </div>


            <div>
                {children}
            </div>


            
            {isButtonPresent && <Button 

            classname={buttonControl}
            onClick={handleSubmit}
            text = { buttonText ? buttonText :  defaultButtonText } 
            
            />}

    

        </MiniContainer>
    );
}

export default TransfersContainer;