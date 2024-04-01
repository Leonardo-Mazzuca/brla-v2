import Text from "../../types/Text/Text";



const Heading: React.FC<Text> = ({content,color = "text-gray-900", size = "md:text-5xl text-3xl", addons}) => {


    return <h2 className={`${size}  font-bold text-${color} ${addons}`}>{content}</h2>;

}
export default Heading;