import React, { useEffect, useRef, useState } from "react";
import Button from "../../Button/Button";
import TextModel from "../../Text/Text";

import { useNavigate } from "react-router-dom";
import { useRegister } from "../../../../context/Register/FormContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { validateUserController } from "../../../../controller/ValidateUserController/validateUserController";
import { DEFAULT_PATH } from "../../../../contants/Paths/paths";
import { registerController } from "../../../../controller/RegisterController/RegisterController";
import { GAP_DEFAULT, TEXT_GRAY_500 } from "../../../../contants/classnames/classnames";
import { Form } from "../../Form/FormWrapper";
import { HeadingText } from "./components/HeadingText/HeadintText";
import { FormRegister4 } from "./components/FormRegister4/FormRegister4";


const inputItems = ["code1", "code2", "code3", "code4", "code5", "code6"];

const FormStep4: React.FC = () => {


  return (
    


    <Form.Container>
      

      <Form.Wrapper>

            <Form.Link 
            path="/" 
            content="Voltar para o login"
            inCenter
            
            />

            <Form.Heading 
            content="Confirme seu email"
            inCenter
            />
        
            <HeadingText />

            <FormRegister4 />

      </Form.Wrapper>


    </Form.Container>

  );
};

export default FormStep4;
