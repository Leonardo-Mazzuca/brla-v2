import { DEFAULT_TEXT_SIZE, FONT_NORMAL, TEXT_GRAY_500 } from "../../contants/classnames/classnames";
import Text from "../../types/Text/Text";



const TextModel: React.FC<Text> = 
({content,color = TEXT_GRAY_500, size = DEFAULT_TEXT_SIZE, addons, weight = FONT_NORMAL}) => {


    return <p className={`${size} ${weight} ${color} ${addons}`}>{content}</p>;

}

export default TextModel;