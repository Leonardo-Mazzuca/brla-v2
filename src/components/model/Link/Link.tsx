import { ReactNode } from "react";
import { Link } from "react-router-dom"


type LinkConfig = {
    linkPath: string;
    children: ReactNode;
}


const LinkModel:React.FC<LinkConfig> = ({linkPath, children}) => {

    return <Link className="text-lg md:text-2xl text-gray-500" to={linkPath}>{children}</Link>
}

export default LinkModel;