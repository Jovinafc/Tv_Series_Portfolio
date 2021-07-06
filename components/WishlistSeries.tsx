import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import db from '../firebase';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/client';
import { removeFromWishList } from '../slices/wishlistSlice';

const WishlistSeries = ({ series }) => {
  const [session] = useSession();
  const router = useRouter();
  const seriesRef = db.collection(`users/${session.user.email}/wished`);
  const dispatch = useDispatch();

  const removeWished = async (id) => {
    await seriesRef
      .doc(id)
      .delete()
      .then((res) => {
        console.log(res);
        dispatch(removeFromWishList({ id }));
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
        onClick={() => removeWished(series.id)}
      >
        Remove from WishList
      </button>
    </div>
  );
};

export default WishlistSeries;
