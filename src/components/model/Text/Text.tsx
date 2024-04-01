import Text from "../../types/Text/Text";



const TextModel: React.FC<Text> = 
({content,color = "text-gray-500", size = " text-lg md:text-2xl", addons, weight = 'font-normal'}) => {


    return <p className={`${size} ${weight} ${color} ${addons}`}>{content}</p>;

}

export default TextModel;