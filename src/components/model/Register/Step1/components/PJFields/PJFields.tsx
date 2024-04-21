
import { Register1State, dataPJ } from "../../context/Register1Context";
import InputModel from "../../../../Input/InputModel/InputModel";
import TextModel from "../../../../Text/Text";
import { TEXT_RED_600 } from "../../../../../../contants/classnames/classnames";

import { InputDate } from "../../../../Input/InputDate/InputDate";
import { useCnpj } from "../Register1Form/hooks/useCnpj";
import { RegisterFieldProps } from "../../@types/RegisterFieldsProps";


export interface PJFieldsProps extends RegisterFieldProps<Register1State> {

    fields: dataPJ[],

}

export const PJFields = ({ fields, register, errors, control }: PJFieldsProps) => {

    const {cnpj, handleCnpjChange} = useCnpj();


    return (

        <>
            {fields.map((_, index) => {
                return (

                    <div key={index}>
                        <div className="flex flex-col">

                            <InputModel

                                id={'cnpj'}
                                type={'text'}
                                placeholder="CNPJ"
                                register={register}
                                name={`dataPJ.${index}.cnpj`}
                                value={cnpj}
                                onChange={handleCnpjChange}
                             
                            />

                            {errors.dataPJ?.[index]?.cnpj &&
                                <TextModel
                                    addons={`text-sm`}
                                    color={TEXT_RED_600}
                                    content={errors.dataPJ?.[index]?.cnpj?.message}
                                />
                            }
                            
                        </div>

                        <div className="my-3 flex flex-col">

                            <InputDate 

                            control={control} 
                            name={`dataPJ.${index}.startDate`}
                            label="Quando você criou sua empresa?"

                            />
                            
                         
                            {errors.dataPJ?.[index]?.startDate &&
                                <TextModel
                                    addons={`text-sm`}
                                    color={TEXT_RED_600}
                                    content={errors.dataPJ?.[index]?.startDate?.message}
                                />
                            }

                        </div>

                        <div className="flex flex-col">

                            <InputModel
                                id={'comapnyName'}
                                type={'text'}
                                placeholder="Nome da empresa"
                                register={register}
                                name={`dataPJ.${index}.companyName`}
                            />

                            {errors.dataPJ?.[index]?.companyName &&
                                <TextModel
                                    addons={`text-sm`}
                                    color={TEXT_RED_600}
                                    content={errors.dataPJ?.[index]?.companyName?.message}
                                />
                            }

                        </div>

                        {errors.dataPJ && 
                         <TextModel
                         addons={`text-sm`}
                         color={TEXT_RED_600}
                         content={errors.dataPJ?.message}
                        />}
                     
                    </div>
                )

            })}
        </>
    )

}