
import { z } from "zod";
import { FormActions, useRegister } from "../../../../context/Register/FormContext";
import { faBuilding, faEnvelope, faIdCard, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Field } from "../../Input/InputModel/InputModel";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";


import { formatValueInCnpj } from "../../../../functions/Formatters/formatValueInCnpj";
import { formatValueInPhoneNumber } from "../../../../functions/Formatters/FormatPhoneNumber/formatValueInPhoneNumber";
import formatDate from "../../../../functions/Formatters/FormatDate/formatDate";
import { formatValueInCpf } from "../../../../functions/Formatters/formatValueInCpf";
import { validityRawPhoneNumber } from "../../../../functions/TaxId/PhoneNumber/verifyPhoneNumber";
import { Form } from "../../Form/FormWrapper";
import { FormFooter } from "./components/FormFooter/FormFooter";
import { Register1Form } from "./components/Register1Form/Register1Form";
import { Register1Provider } from "./context/Register1Context";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const FormStep1 = () => {

  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <Register1Provider>

        <Form.Container>

            <Form.Wrapper>

                <Form.Heading content="Vamos lá!"/>

                  <Register1Form />

                <FormFooter />

            </Form.Wrapper>


        </Form.Container>

      </Register1Provider>

    </LocalizationProvider>
  
  );
  
};

export default FormStep1;
