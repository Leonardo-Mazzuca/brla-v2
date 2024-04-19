
import { getCurrencyIMG } from "../../../../../service/CurrencyService/getCurrencyIMG";
import TextModel from "../../../Text/Text";

type ConversionCardProps = {

    currency: string;
    value: string;
    
}

const ConversionCard: React.FC<ConversionCardProps> = ({ currency, value }) => {

    return (
        <div className="p-8 bg-gray-100 my-3 flex justify-center gap-6 items-center relative">

            <div className="flex justify-between mx-auto items-center gap-6">

                <div className="h-12 w-12 flex items-center justify-center rounded-full overflow-hidden">
                    <img    
                        className="h-full w-full"
                        src={getCurrencyIMG(currency)}
                        alt={`${currency} flag`}
                    />
                </div>
                <TextModel
                    weight="font-semibold"
                    size="text-3xl"
                    addons="text-heading-blue"
                    content={`${currency} ${value}`}
                />
            </div>
        </div>
        
    );
}

export default ConversionCard;
