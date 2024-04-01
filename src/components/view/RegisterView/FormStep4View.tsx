import FormWrapper from "../../model/Form/FormWrapper/FormWrapper";
import FormStep4 from "../../model/Register/FormStep4";




const CreatePassView: React.FC = ()=> {

    return (

        <FormWrapper 
        withLink = {true} link="/" heading="Confirme seu email" headingCenter = {true}
        linkCenter = {true} linkText="Voltar para o login">

            <FormStep4 />
            
        </FormWrapper>
    );
}

export default CreatePassView;