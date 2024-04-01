import { number } from "zod";




export const formatNumber = (e: React.ChangeEvent<HTMLInputElement>) => {

    const sanitizedValue = e.target.value.replace(/[^\d,]/g, "");
    const [beforeComma, afterComma] = sanitizedValue.split(",");
    const formattedBeforeComma = beforeComma.padStart(2, "0");
    const formattedAfterComma = afterComma ? afterComma.slice(0, 2) : "00";
    const formattedValue = `${formattedBeforeComma},${formattedAfterComma}`;
    
    return {formattedValue,sanitizedValue};

}