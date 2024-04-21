import { useEffect, useState } from "react"
import { RegisterActions, useRegisterForStep1 } from "../../../context/Register1Context";



export const useCountry = () => {


    const [country, setCountry] = useState('Brasil');
    const {dispatch} = useRegisterForStep1();


    useEffect(()=> {

        dispatch({
            type:RegisterActions.setCountry,
            payload: {country}
        })

    },[country])

    return {

        country,
        setCountry,

    }
}