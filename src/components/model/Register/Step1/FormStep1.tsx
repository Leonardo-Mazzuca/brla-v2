
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
