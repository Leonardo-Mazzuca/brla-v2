import { useEffect, useState } from 'react';


interface InputMoneyProps {

  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

const DECIMAL_SIZE = 2;

const InputMoney = ({ value, onChange }: InputMoneyProps) => {
    
  const [currentValue, setCurrentValue] = useState<string>(`${value}`);

  useEffect(() => {

    let valueString = `${value}`;
    
    if (!/\D/.test(valueString.replace('.', ''))) {
      setCurrentValue(value.toFixed(DECIMAL_SIZE).toString().replace('.', ','));
    }

    if(isNaN(value)) {
      setCurrentValue('00,00');
    }

  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const valueRemoved = event.target.value.replace(',', '');

    const sizeSlice = valueRemoved.length - DECIMAL_SIZE;
    const newValue = [valueRemoved.slice(0, sizeSlice), '.', valueRemoved.slice(sizeSlice)].join(
      '',
    );

    onChange({
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    });
  };

  return (

    <input

      type='text'
      className={`bg-transparent px-0 pt-3 md:p-3 text-4xl font-bold border-transparent w-full md:w-2/4 text-start md:text-end`}
      value={currentValue}
      onChange={handleOnChange}

    />

  );
};

export default InputMoney;