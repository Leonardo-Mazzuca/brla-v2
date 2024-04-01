import { ReactNode, useEffect, useState } from "react";
import Button from "../Button/Button";
import MiniContainer from "./MiniContainer";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../ProgressBar/ProgressBar";


type ConversionConfig = {

    children: ReactNode;
    location?: string;
    buttonComponent: ReactNode;
    activeIndex: number;
    onSubmit?: () => void;
    buttonControl?: string
    
    
}

const ConversionContainer:React.FC<ConversionConfig> = ({
    children,location,
    buttonComponent,
    activeIndex,
    onSubmit,
    buttonControl}) => {

    const navigate = useNavigate();

    const [buttonClassname, setButtonClassname] = useState(buttonControl);


    useEffect(() => {
        handleButtonVisibility();
    }, [buttonControl]);

    const handleSubmit = () => {

        if(onSubmit) {
            onSubmit();
        }

        if(location) {

            navigate(location);
        }
    
    }

    const handleButtonVisibility = () => {

        
         setButtonClassname(buttonControl);
   
        

    }

  

    return (
        
        <MiniContainer className="relative">    


            <div className="w-1/2 mx-auto">
                <ProgressBar activeIndex={activeIndex} IsSecondVisible = {false} />
            </div>



            <div>
                {children}
            </div>



            <Button 

                onClick={handleSubmit}
                text = {buttonComponent}
                classname={buttonClassname} 
                
            />
            

        </MiniContainer>
    );
}

export default ConversionContainer;