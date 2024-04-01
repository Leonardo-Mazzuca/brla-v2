import { ReactNode } from "react";



export default interface Text {
    
    content: string | ReactNode | any;
    color? : string;
    size? : string;
    addons? : string;
    weight?: string;
    
}