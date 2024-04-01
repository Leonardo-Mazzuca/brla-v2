import React from 'react';


const Logo: React.FC = () => {
  return (
    
    <div className='flex items-center gap-5'>
        <img src='/logo.svg' alt='Logo of BRLA' className='w-14' />
        <h2 className='text-5xl font-bold text-heading-blue'>BRLA</h2>
    </div>
    
  );

};

export default Logo;