import React from 'react';
import { useRouter } from 'next/router';

const Navigatior = ({ first, pageNo }) => {
  const router = useRouter();

  function prevPage() {
    if (parseInt(pageNo) === 2) {
      router.push('/');
    } else {
      router.push('/' + (parseInt(pageNo) - 1));
    }
  }

  function nextPage() {
    router.push('/' + (parseInt(pageNo) + 1));
  }

  return (
    <div className='p-5 flex'>
      {!first ? (
        <button className='bg-yellow-300 p-2' onClick={prevPage}>
          Previous Page
        </button>
      ) : null}

      <button className='bg-yellow-300 p-2 ml-auto' onClick={nextPage}>
        Next Page
      </button>
    </div>
  );
};

export default Navigatior;
