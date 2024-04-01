import { useState } from "react";

const CopyToClipBoard = ({ copyItem }: { copyItem: string }) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(copyItem);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); 
    };

    return (

        <div className="w-full relative mt-3">
            
            <input

                type="text"

                className="col-span-6 bg-gray-50
                 text-gray-500 rounded-lg
                 focus:border-emerald-300 block w-full p-2.5 
                 border-transparent py-5 text-xl pe-16 cursor-pointer"

                value={copyItem}
                readOnly
                onClick={copyToClipboard}
            />

            <div

                onClick={copyToClipboard}
                className="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center
                cursor-pointer
                "
            >

                <span>

                    {isCopied ?  <i className="fa-solid fa-check text-emerald-300"></i> : <i className="fa-solid fa-copy"></i>}

                </span>

            </div>
        </div>
    );
};

export default CopyToClipBoard;
