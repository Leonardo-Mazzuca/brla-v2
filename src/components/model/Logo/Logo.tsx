import React from 'react';
import { FLEX, GAP_DEFAULT, ITEMS_CENTER, JUSTIFY_CENTER } from '../../contants/classnames/classnames';
import { useNavigate } from 'react-router-dom';
import { TO_HOME } from '../../contants/Paths/paths';
import { USER_LOGGED } from '../../contants/sessionStorageKeys/sessionStorageKeys';


const Logo: React.FC = () => {

  const navigate = useNavigate();
  const userLogged = sessionStorage.getItem(USER_LOGGED) ?? '';

  return (
    
    <div className={`${FLEX} ${JUSTIFY_CENTER} ${ITEMS_CENTER} ${GAP_DEFAULT}`} 
      onClick={() => userLogged ? navigate(TO_HOME) : ''}
      >
        <img src='/logo.svg' alt='Logo of BRLA' className='w-8' />
        <h2 className='text-3xl font-bold text-heading-blue'>BRLA</h2>
    </div>
    
  );

};

export default Logo;