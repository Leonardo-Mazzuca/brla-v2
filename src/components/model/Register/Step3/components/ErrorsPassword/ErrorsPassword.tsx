import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TEXT_GRAY_500, TEXT_RED_600 } from "../../../../../../contants/classnames/classnames"
import { faX } from "@fortawesome/free-solid-svg-icons"



type ErrorsPasswordProps = {
    errors: any[]
}


export const ErrorsPassword = ({errors}:ErrorsPasswordProps) => {

    return (

        
    <div className={`flex gap-4 my-3 flex-col`}>

        {errors.map((error:any, index:number) => (

            <div key={index} className={`flex items-center gap-default`}>
                <FontAwesomeIcon icon={faX} className={TEXT_RED_600} />
                <p className={`${TEXT_GRAY_500} mx-2 text-sm`}>{error}</p>
            </div>

        ))}

    </div>

    )


}