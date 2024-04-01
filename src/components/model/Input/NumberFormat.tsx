import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';


const NumberFormatInput = ({ value, handleChange }: any) => {

  const [inputValue, setInputValue] = useState<string>('00');

  return (
    
    <NumericFormat
      className="bg-transparent px-0 pt-3 md:p-3 text-4xl font-bold border-transparent w-full md:w-2/4 text-start md:text-end"
      type="text"
      thousandSeparator=","
      value={inputValue}
      onChange={handleChange}
      defaultValue={0}
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
      onValueChange={(values) => {

        const { formattedValue } = values;
    
        if (formattedValue === '' || formattedValue === '0,00') {
          setInputValue('00');

        } else {

          setInputValue(formattedValue);

        }

      }}

    />
  );
};

export default NumberFormatInput;
