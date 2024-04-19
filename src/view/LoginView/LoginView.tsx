import FormWrapper from "../../components/model/Form/FormWrapper/FormWrapper";
import FormLogin from "../../components/model/Login/FormLogin";


const LoginView: React.FC = () => {


    return (

        <FormWrapper heading="Entre na sua conta">

            <FormLogin />

        </FormWrapper>

    );
}

export default LoginView;
