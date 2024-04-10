import { ReactNode } from "react";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import CopyToClipBoard from "../Input/CopyToClipboard";
import LinkModel from "../Link/Link";
import TextModel from "../Text/Text";
import ContainerService from "./ContainerService";
import MiniContainer from "./MiniContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";



type DepositsConfig = {

    heading: string | ReactNode;
    subHeading: string | ReactNode;
    description: string;
    copyItem: string;
    qrCode: ReactNode;

}


const DepositsContainer: React.FC<DepositsConfig> = ({heading,subHeading,description,copyItem,qrCode}) => {


    const navigate = useNavigate();

    return (

        <ContainerService path="/home" linkText="Dashboard">

                <MiniContainer>

                        <LinkModel linkPath="/deposit">
                            <FontAwesomeIcon className="me-2" icon={faCircleLeft} />
                            Voltar
                        </LinkModel>

                    <div className="mx-auto w-full">

                        <div className="flex lg:flex-row flex-col py-5 pb-10">

                            <div className="flex flex-col mb-6 md:mb-0 justify-around md:me-16">

                                <div>
                                    <Heading size="text-3xl" content = {heading} />
                                    <TextModel addons="my-5 md:my-10" content = {subHeading} />
                                </div>
                                <TextModel color="text-gray-400" size="text-lg" content = {description} />

                            </div>

                            <div className="flex flex-col justify-around mx-auto lg:mx-0">

                                <div className="flex justify-center
                                border border-gray-400 w-full p-6 rounded-xl">
                                    {qrCode}
                                </div>

                                <CopyToClipBoard
                                copyItem={copyItem}

                                />

                            </div>

                        </div>

                        
                    <Button 

                        onClick={() => navigate('/home')}
                        text = {

                        <>
                        Concluir
                        <i className="mx-2 fa-solid fa-arrow-right"></i>
                        </>

                        } />

                        
                    </div>
    


                    </MiniContainer>





        </ContainerService>
    )


}

export default DepositsContainer;