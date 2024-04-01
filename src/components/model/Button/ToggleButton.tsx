import React from "react";


type ToggleProps = {
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
}

const ToggleButton: React.FC<ToggleProps> = ({onChange}) => {


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
    }

    return (
        <label
     
         className="inline-flex items-center cursor-pointer">
            <span className="ms-3 me-2 text-gray-400 text-lg">Fixar valor</span>
            <input type="checkbox" value="" className="sr-only peer"
            onChange={handleChange}
            />

            <div style={{fontFamily: "FontAwesome"}} className="relative w-12 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['\f023'] after:text-xs after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:flex after:items-center after:justify-center
             after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-heading-blue">
           
            </div>

        </label>
    );
};

export default ToggleButton;
