import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GAP_DEFAULT } from '../../../contants/classnames/classnames';
import { USER_LOGGED } from '../../../contants/sessionStorageKeys/sessionStorageKeys';
import { TO_HOME } from '../../../contants/Paths/paths';


const Logo: React.FC = () => {

  const navigate = useNavigate();
  const userLogged = sessionStorage.getItem(USER_LOGGED) ?? '';

  return (
    
    <div className={`flex justify-center items-center ${GAP_DEFAULT}`} 
      onClick={() => userLogged ? navigate(TO_HOME) : ''}
      >
        <img src='/logo.svg' alt='Logo of BRLA' className='w-8' />
        <h2 className='text-3xl font-bold text-heading-blue'>BRLA</h2>
    </div>
    
  );

};

export default Logo;