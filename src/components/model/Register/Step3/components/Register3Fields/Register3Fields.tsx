import { extend } from "dayjs";
import { TEXT_RED_600 } from "../../../../../../contants/classnames/classnames";
import InputModel, { Field } from "../../../../Input/InputModel/InputModel";
import TextModel from "../../../../Text/Text";
import { PasswordProps } from "../../@types/PasswordProps";
import { FieldErrors, FieldValues } from "react-hook-form";

interface Register3Props<T extends FieldValues> {
  fields: Field[];
  errors: FieldErrors<T>;
}

export const Register3Fields = ({
  fields,
  errors,
}: Register3Props<PasswordProps>) => {
  return (
    <div>
      {fields.map((item, index) => {
        return (
          <div key={index}>
            <InputModel {...item} />

            {errors[item.name as keyof PasswordProps] && (
              <TextModel
                addons={`text-sm`}
                color={TEXT_RED_600}
                content={errors[item.name as keyof PasswordProps]?.message}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
