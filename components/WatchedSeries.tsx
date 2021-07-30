import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import db from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../slices/userSlice';
import { removeFromWatchList } from '../slices/watchedlistSlice';
import { setAlert } from '../slices/alertSlice';

const WatchedSeries = ({ series }) => {
  const router = useRouter();
  const user = useSelector(userData);
  const dispatch = useDispatch();

  const removeWatched = async (id) => {
    await db
      .collection(`users/${user.uid}/watched`)
      .doc(id)
      .delete()
      .then((res) => {
        console.log(res);
        dispatch(removeFromWatchList({ id }));
        dispatch(
          setAlert({
            alert_type: 'Success',
            alert_message: 'Series Removed',
          })
        );
      });
  };

  return (
    <div className='bg-gray-600 m-4 p-2 text-center cursor-pointer text-white'>
      <p className='font-bold text-auto mb-2 h-5'>
        {series.data.tv_series_name}
      </p>
      <Image
        onClick={() => router.push('/series/' + series.data.tv_series_id)}
        src={series.data.tv_image}
        height={300}
        width={300}
        objectFit='contain'
      />
      <button
        className='bg-yellow-300 text-sm text-black p-2'
        onClick={() => removeWatched(series.id)}
      >
        Remove from Watched
      </button>
    </div>
  );
};

export default WatchedSeries;
