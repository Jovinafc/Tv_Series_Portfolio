import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';

const Input = () => {
  return (
    <div className='flex mt-5 items-center h-10 rounded bg-red-700 cursor-pointer flex-grow hover:bg-yellow-500'>
      <input
        className='p-2 h-full w-6 flex-grow rounded-l-md focus:outline-none px-4'
        type='text'
      />
      <SearchIcon className='h-10 p-4' />
    </div>
  );
};

export default Input;
