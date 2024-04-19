import { ReactNode } from "react";
import { DEFAULT_TEXT_SIZE, TEXT_GRAY_500 } from "../../../contants/classnames/classnames";


export interface Text {
    
    content: string | ReactNode | any;
    color? : string;
    size? : string;
    addons? : string;
    weight?: string;
    
}

const TextModel: React.FC<Text> = 
({content,color = TEXT_GRAY_500, size = DEFAULT_TEXT_SIZE, addons, weight = 'font-normal'}) => {


    return <p className={`${size} ${weight} ${color} ${addons}`}>{content}</p>;

}

export default TextModel;