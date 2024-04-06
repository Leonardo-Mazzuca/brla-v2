import React, { useState } from "react";
import { Field } from "../../types/Field/Field";
import FormModel from "../Form/FormModel/FormModel";
import { z } from "zod";
import { FormActions, useForm as useFormContext } from "../../context/FormContext";
import { addressService } from "../../service/AddressService/addressService";
import { useForm } from "react-hook-form";
import { FLEX, FLEX_COL, GAP_DEFAULT, GRID, GRID_COLS_2 } from "../../contants/classnames/classnames";

const FormStep2: React.FC = () => {

  const [error, setError] = useState("");
  const [address, setAddress] = useState({
    city: "",
    state: "",
    street: "",
  });

  const { dispatch } = useFormContext();


  async function handleInput(cep: string) {
    
    const response = await addressService(cep.replace(/\D/g, ''));
    if (!response) {
      setError("Insira um cep válido!");
      return false;
    } else {

      setAddress({
        city: response.localidade,
        state: response.uf,
        street: response.logradouro,
      });
      return true;

    }
  }

  const schema = z.object({
    cep: z
      .string()
      .min(1, "Cep não pode ficar vazio!")
      .refine((cep) => handleInput(cep), { message: error }),

      city: z.string().min(1, "Cidade não pode ficar vazia!"),
      state: z.string().min(1, "Estado não pode ser vazio!"),
      street: z.string().min(1, "Bairro não pode ficar vazio!"),
      complement: z.string().min(1, "Complemento não pode ser vazio!"),
      number: z.string().optional(),
  });

  type Step2Data = z.infer<typeof schema>;

  const fields: Field[] = [
    { type: "text", placeholder: "CEP", name: "cep" },
    { type: "text", placeholder: "Cidade", name: "city", value: address.city },
    { type: "text", placeholder: "Estado", name: "state", value: address.state },
    { type: "text", placeholder: "Bairro", name: "street", value: address.street },
    { type: "text", placeholder: "Complemento", name: "complement" },
    { type: "text", placeholder: "Número", name: "number" },
  ];

  const handleSubmit = (data: Step2Data) => {
    const district = "District";
    const { cep, city, state, street, number, complement } = data;

    dispatch({
      type: FormActions.setStep2,
      payload: { cep, city, state, street, number, district, complement },
    });
  };

  return (

    <FormModel
      schema={schema}
      classname={`md:${GRID} md:${GRID_COLS_2} ${GAP_DEFAULT} sm:${FLEX} sm:${FLEX_COL}`}
      location="/step3"
      buttonText="próximo"
      fields={fields}
      onSubmit={handleSubmit}
    />

  );
};

export default FormStep2;
