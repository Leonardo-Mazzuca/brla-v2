import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextModel from "../../../../Text/Text";
import { TEXT_GRAY_400, TEXT_GRAY_700, TEXT_GREEN_700 } from "../../../../../../contants/classnames/classnames";

const DefaultTemplate = ({

    icon,
    title,
    date,
    amount,
    footerText,
    addressNumber,
  
  }: any) => (
    
    <div className="w-full flex flex-col">
  
      <article className="flex justify-between flex-col xl:flex-row">
  
  
        <div className="flex items-center justify-between gap-5">
          <div style={{borderRadius: '100%'}} className="flex items-center justify-center border border-black text-md h-[40px] text-center w-[40px]">
            <FontAwesomeIcon icon={icon} />
          </div>
  
          <div className="xl:text-start text-end">
            <TextModel size="text-xl" color={TEXT_GRAY_700} content={title} />
            <TextModel color={TEXT_GRAY_400} content={date} />
          </div>
  
        </div>
  
        <div className="flex items-end flex-col justify-between flex-wrap">
  
          <TextModel
            size={'text-xl'}
            weight={'font-bold'}
            addons={`w-auto my-3 ${TEXT_GREEN_700}`}
            content={amount}
          />
  
          <TextModel
            addons={`text-center md:text-end`}
            content={`${footerText} ${addressNumber}`}
          />
  
        </div>
  
      </article>
  
      <hr className="mt-10" />
  
    </div>
  );

  export default DefaultTemplate