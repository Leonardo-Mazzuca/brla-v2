import { HEADING_BLUE_800 } from "../../../../../contants/classnames/classnames"



type FormHeadingProps = {
    inCenter?: boolean;
    content: string
}

export const FormHeading = ({content, inCenter = false}:FormHeadingProps) => {

    return (

        <h3 className={`${HEADING_BLUE_800} text-xl font-bold ${inCenter && 'text-center'}`}>
            {content}
        </h3>

    )
}