import { ReactNode, useEffect, useState } from "react";
import Button from "../Button/Button";
import MiniContainer from "./MiniContainer";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../ProgressBar/ProgressBar";
import { MARGIN_X_AUTO, RELATIVE, WIDTH_FULL } from "../../contants/classnames/classnames";


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
        
        <MiniContainer className={RELATIVE}>    


            <div className={`md:px-24 ${WIDTH_FULL} ${MARGIN_X_AUTO}`}>
                <ProgressBar activeIndex={activeIndex} IsSecondVisible = {false} />
            </div>

       
            {children}
         

            <Button 
                onClick={handleSubmit}
                text = {buttonComponent}
                classname={buttonClassname} 
            />
            

        </MiniContainer>
    );
}

export default ConversionContainer;