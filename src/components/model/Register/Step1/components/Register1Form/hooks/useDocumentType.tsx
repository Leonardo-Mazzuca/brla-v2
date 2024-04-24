import React, { useState } from "react"


export const useDocumentType = () => {


    const [docType, setDocType] = useState('');



    const handleDocTypeChange = (e:React.ChangeEvent<HTMLInputElement>) => {

        setDocType(e.target.value);

    }

    return {
        docType,
        handleDocTypeChange,
    }


}