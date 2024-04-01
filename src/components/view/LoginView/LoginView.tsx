
import FormLogin from "../../model/Login/FormLogin";
import FormWrapper from "../../model/Form/FormWrapper/FormWrapper";



const LoginView: React.FC = () => {


    return (

        <FormWrapper heading="Entre na sua conta">

            <FormLogin />

        </FormWrapper>

    );
}

export default LoginView;
