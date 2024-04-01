import { ReactNode } from "react";



type ButtonProps = {
    text: string | ReactNode;
    background? : string
    type?: "button" | "submit";
    textColor? : string
    hover? : string
    onClick? : () => void | any
    classname? : string;
    disabled? : boolean;

}

export default ButtonProps;