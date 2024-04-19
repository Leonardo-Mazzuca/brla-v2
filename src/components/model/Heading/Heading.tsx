import { Text } from "../Text/Text";


const Heading: React.FC<Text> = ({content,color = "text-gray-900",
 size = "md:text-2xl text-xl", addons}) => {


    return <h2 className={`${size} font-bold text-${color} ${addons}`}>{content}</h2>;

}
export default Heading;