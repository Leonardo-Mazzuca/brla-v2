import { Link } from "react-router-dom"
import { DEFAULT_TEXT_SIZE, GAP_DEFAULT, TEXT_GRAY_400, TEXT_GRAY_800 } from "../../../../../../contants/classnames/classnames"
import TextModel from "../../../../Text/Text"



export const FormFooter = () => {


    return (


        <div className="my-2">

        <TextModel
        color="gray-400"
        addons={`text-sm md:${DEFAULT_TEXT_SIZE}`}
        content ={
        

        <div className={`flex ${GAP_DEFAULT}`}>
            <p className={TEXT_GRAY_400}>Already have an account?</p> 
            <Link className={`${TEXT_GRAY_800} hover:underline`} to={'/'}>Login here</Link>
        </div>
        }
        
        />

    </div>

    );



}