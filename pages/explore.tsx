import React, { useState } from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import axios from 'axios';
import { SearchIcon } from '@heroicons/react/outline';
import SeriesFeed from '../components/SeriesFeed';
import Alert from '../components/Alert';

const explore = () => {
  const [searchName, setSearchName] = useState<string>('');
  const [list, setList] = useState([]);

  const submitHandler = async () => {
    console.log('Button Clicked');
    await axios
      .get(`https://www.episodate.com/api/search?q=${searchName}`)
      .then((res) => {
        console.log(res.data);
        setList(res.data.tv_shows);
      });
  };

  return (
    <div className='bg-gray-900'>
      <Header />
      <Alert />
      <main className='max-w-screen-lg mx-auto min-h-screen h-auto'>
        {/* <Input /> */}
        <div className='flex mt-5 items-center h-10 rounded bg-yellow-400 cursor-pointer flex-grow hover:bg-yellow-500'>
          <input
            className='p-2 h-full w-6 flex-grow rounded-l-md focus:outline-none px-4'
            type='text'
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <SearchIcon onClick={submitHandler} className='h-10 p-2' />
        </div>

        <hr className='bg-white mt-5' />

        <div className='text-xl text-white mt-5 h-auto'>
          {list.length > 0 ? (
            <SeriesFeed tv_shows={list} />
          ) : (
            <p>
              Nothing to show for. Search a series to add them in your watched
              or wishlist
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default explore;
