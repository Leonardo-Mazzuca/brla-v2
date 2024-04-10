import ButtonProps from "../../types/Button/ButtonProps";




const IconButton: React.FC<ButtonProps> = ({text, onClick, classname}) => {



    const buttonClassname: string = 
    `items-center bg-gradient-to-br from-white 
    via-slate-50 to-slate-100 text-gray-600 
    justify-center rounded-[100%] 
    focus:outline-none focus:ring-2 
    text-xl
    focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600 
    transition-colors duration-300 ease-in-out dark:hover:bg-gray-400 
    hover:from-slate-100 hover:via-slate-200 hover:to-slate-300 py-4 px-6 ${classname ?? ''}`;

    return <button onClick={onClick} className={buttonClassname}>


        {text}
        
    </button>
}

export default IconButton;