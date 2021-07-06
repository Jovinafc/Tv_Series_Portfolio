import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/client';
import { addToWatchedList } from '../slices/watchedlistSlice';
import { addToWishList } from '../slices/wishlistSlice';
import { addToWatched, addToWish } from '../HelperFunctions/add';

const Details = ({ tv_shows }) => {
  const [session] = useSession();
  const dispatch = useDispatch();

  const addToWatchedSeries = async () => {
    const items = await addToWatched(tv_shows, session);
    if (items !== 'Already Present') {
      dispatch(addToWatchedList({ items }));
    } else {
      alert('Already Present');
    }
    return items;
  };

  const addToWishedSeries = async () => {
    const items = await addToWish(tv_shows, session);
    if (items !== 'Already Present') {
      dispatch(addToWishList({ items }));
    } else {
      alert('Already Present');
    }
  };

  return (
    <div className='pb-6'>
      <div className='flex flex-col space-y-2 md:flex-row md:p-4 space-x-2'>
        <div className=''>
          <img src={tv_shows.image_path} alt='' className='w-full' />
        </div>
        <div className='text-white pl-4 mb-2 pb-2'>
          <h2 className='text-4xl mb-2'>{tv_shows.name}</h2>
          <p className='text-sm mb-5'>
            {tv_shows.country} | {tv_shows.network}
          </p>

          <div className='flex flex-col space-y-3 mb-2'>
            <div className='flex space-x-5'>
              <p>Genre:</p>
              {tv_shows.genres.length > 0
                ? tv_shows.genres.map((genre) => <p key={genre}>{genre}</p>)
                : null}
            </div>

            <div className='flex space-x-2'>
              <p>Rating:</p>
              <p>{tv_shows.rating.substring(0, 4)}</p>
            </div>

            <div className='flex space-x-2'>
              <p>Seasons:</p>
              <p>{tv_shows.episodes[tv_shows.episodes.length - 1].season}</p>
            </div>

            <div className='flex space-x-2'>
              <p>Total Episodes:</p>
              <p>{tv_shows.episodes.length}</p>
            </div>

            <div className='flex space-x-2'>
              <p>Avg Runtime:</p>
              <p>{tv_shows.runtime} mins</p>
            </div>

            <div className='flex space-x-2'>
              <p>Status:</p>
              <p>{tv_shows.status}</p>
            </div>

            <div className='flex space-x-2'>
              <p>Start Date: </p>
              <p>{tv_shows.start_date}</p>
            </div>

            <div>
              <button
                className='bg-yellow-300 text-sm text-black p-2  mr-4'
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

          {/* <p>{tv_shows.description}</p> */}
        </div>
      </div>
      <div className='bg-white h-1 mb-2' />

      <div className='text-white mb-5 px-2'>
        <h5>Description:</h5>
        <p>{tv_shows.description.replace(/<[^>]+>/g, '')}</p>
      </div>

      <div className='bg-white h-1 mb-3' />

      <div className='text-white px-2'>
        <p className='mb-4'>Some Stills</p>
        <div className='flex whitespace-nowrap space-x-2 overflow-x-scroll scrollbar-hide'>
          {tv_shows.pictures.map((pict) => (
            <img
              src={pict}
              className='transition duration-100 transform hover:scale-125'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
