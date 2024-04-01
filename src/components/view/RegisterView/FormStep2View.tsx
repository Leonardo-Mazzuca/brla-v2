import FormWrapper from "../../model/Form/FormWrapper/FormWrapper";
import FormStep2 from "../../model/Register/FormStep2";





const RegisterAdressView: React.FC = () => {
    return (

        <FormWrapper withLink={true} link="/step1" heading="Endereço">
            <FormStep2 />
        </FormWrapper>

    );
}

export default RegisterAdressView;