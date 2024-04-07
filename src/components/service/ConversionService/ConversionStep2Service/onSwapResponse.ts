import { HIDDEN } from "../../../contants/classnames/classnames";
import { CompleteProps } from "../../../model/Completed/Completed";



export function onSwapSuccess(success: boolean, showLoading: 
    React.Dispatch<React.SetStateAction<boolean>>,
     showCompleted: React.Dispatch<React.SetStateAction<boolean>>, 
     setButtonClassname: React.Dispatch<React.SetStateAction<string>>, 
     setSuccessMessage: React.Dispatch<React.SetStateAction<CompleteProps>>) {

        if (success) {

            showLoading(false);
            showCompleted(true);
            setButtonClassname(HIDDEN);
            setSuccessMessage({
                buttonText: 'Concluir',
                completeMessage: 'Conversão concluída',
                text: 'Você pode monitorar suas transações através do dashboard inicial.',
                path: '/home',
            });
        }


    
}

export function onSwapError(error: boolean,errorMessage: string, showLoading: 
    React.Dispatch<React.SetStateAction<boolean>>,
     showCompleted: React.Dispatch<React.SetStateAction<boolean>>, 
     setButtonClassname: React.Dispatch<React.SetStateAction<string>>, 
     setSuccessMessage: React.Dispatch<React.SetStateAction<CompleteProps>>) {

        if (error) {
            showCompleted(true);
            showLoading(false);
            setButtonClassname(HIDDEN);
            setSuccessMessage({
                buttonText: 'Voltar',
                path: '/convert/1',
                completeMessage: errorMessage,
                text: 'Realize a operação novamente',
                image: '/X-error.png',
            });
        }
    
}

