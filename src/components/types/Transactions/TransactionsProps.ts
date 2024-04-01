import { ReactNode } from "react";



export default interface TransactionProps {

    linkIsEnable: boolean;
    children?: React.ReactNode
    classname? : string;
    linkPath?: string;
    headingColReverse?: boolean;
    linkContent? : ReactNode;
    valuesArrival?: ReactNode;
    
}
