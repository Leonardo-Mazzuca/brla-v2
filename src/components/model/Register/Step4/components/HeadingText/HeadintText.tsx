import { TEXT_GRAY_500 } from "../../../../../../contants/classnames/classnames"
import TextModel from "../../../../Text/Text"




export const HeadingText = () => {

    return (

        <div className={'my-3'}>
        <TextModel
          color={TEXT_GRAY_500}
          content="Por favor, informe o código que enviamos para o seu e-mail. Não esqueça de verificar o spam."
        />
      </div>

    )
}