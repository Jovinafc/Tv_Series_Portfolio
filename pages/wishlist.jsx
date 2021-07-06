import { useSession } from 'next-auth/client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import db from '../firebase';
import { wishlistSeries, getWishList } from '../slices/wishlistSlice';
import WishlistSeries from '../components/WishlistSeries';

function wishlist() {
  const [session] = useSession();
  const dispatch = useDispatch();
  const wished = useSelector(wishlistSeries);

  useEffect(() => {
    let wishlist = [];

    if (session) {
      db.collection(`users/${session.user.email}/wishlist`)
        .orderBy('timeStamp', 'desc')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            wishlist.push({ id: doc.id, data: doc.data() });
          });
        })
        .then((res) => {
          dispatch(getWishList({ wishlist }));
        });
    }
  }, [session]);

  return (
    <div className='bg-gray-900'>
      <Header />
      <main className='max-w-screen-lg mx-auto min-h-screen h-auto'>
        {wished.length > 0 ? (
          <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4'>
            {wished.map((watch) => (
              <WishlistSeries series={watch} />
            ))}
          </div>
        ) : (
          <div className='text-white p-5'>
            <p>
              Wished List is Empty Add some series that you have yours eyes on
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default wishlist;