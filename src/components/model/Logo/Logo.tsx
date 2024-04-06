import React from 'react';
import { FLEX, GAP_DEFAULT, ITEMS_CENTER, JUSTIFY_CENTER } from '../../contants/classnames/classnames';


const Logo: React.FC = () => {
  return (
    
    <div className={`${FLEX} ${JUSTIFY_CENTER} ${ITEMS_CENTER} ${GAP_DEFAULT}`}>
        <img src='/logo.svg' alt='Logo of BRLA' className='w-8' />
        <h2 className='text-3xl font-bold text-heading-blue'>BRLA</h2>
    </div>
    
  );

};

export default Logo;