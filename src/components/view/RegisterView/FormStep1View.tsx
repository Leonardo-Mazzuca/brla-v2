import FormWrapper from "../../model/Form/FormWrapper/FormWrapper";
import FromStep1 from "../../model/Register/FormStep1";


const RegisterDataView: React.FC = () => {
    return (

            <FormWrapper heading="Vamos lá!">

                <FromStep1 />

            </FormWrapper>

    );
}

export default RegisterDataView;