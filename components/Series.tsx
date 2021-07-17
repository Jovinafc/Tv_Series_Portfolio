import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import db from '../firebase';
import { useSession } from 'next-auth/client';
import { addToWatchedList } from '../slices/watchedlistSlice';
import { addToWishList } from '../slices/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatched, addToWish } from '../HelperFunctions/add';
import { userData } from '../slices/userSlice';

const Series = ({ series }) => {
  const router = useRouter();
  const user = useSelector(userData);
  const [session] = useSession();
  const dispatch = useDispatch();

  const addToWatchedSeries = async () => {
    const items = await addToWatched(series, user);
    if (items !== 'Already Present') {
      dispatch(addToWatchedList({ items }));
    } else {
      alert('Already Present');
    }
    return items;
  };

  const addToWishedSeries = async () => {
    const items = await addToWish(series, user);
    if (items !== 'Already Present') {
      dispatch(addToWishList({ items }));
    } else {
      alert('Already Present');
    }
  };

  return (
    <div className='bg-gray-600 m-4 p-2 text-center cursor-pointer text-white'>
      <p className='font-bold text-auto mb-2 h-5'>{series.name}</p>
      <Image
        onClick={() => router.push('/series/' + series.id)}
        src={series.image_thumbnail_path}
        height={300}
        width={300}
        objectFit='contain'
      />
      <div>
        <button
          className='bg-yellow-300 text-sm text-black p-2 m-2'
          onClick={addToWishedSeries}
        >
          Add to Wishlist
        </button>
        <button
          className='bg-yellow-300 text-sm text-black p-2'
          onClick={addToWatchedSeries}
        >
          Watched
        </button>
      </div>
    </div>
  );
};

export default Series;
