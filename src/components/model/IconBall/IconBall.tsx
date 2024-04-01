import { IconProp, RotateProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



type IconBallProps = {
    icon: IconProp;
    absolute: boolean;
    rotation?: RotateProp;
}

const IconBall = ({icon, absolute,rotation}:IconBallProps) => {
    return (
        
        <div className="relative flex items-center justify-center">

        <div className={`${absolute ? 
        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
         : 'mx-auto'}
         `}>

            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full">
                <FontAwesomeIcon className="text-3xl" icon={icon} rotation={rotation} />
            </div>

        </div>
        
    </div>
    )
};

export default IconBall;