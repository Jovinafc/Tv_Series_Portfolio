import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Alert from '../components/Alert';
import db from '../firebase';
import { wishlistSeries, getWishList } from '../slices/wishlistSlice';
import WishlistSeries from '../components/WishlistSeries';
import Modal from '../components/Modal';
import { modalData } from '../slices/modalSlice';

function wishlist() {
  const dispatch = useDispatch();
  const modal = useSelector(modalData);

  const wished = useSelector(wishlistSeries);

  useEffect(() => {
    let wishlist = [];

    if (localStorage.user) {
      let user = JSON.parse(localStorage.getItem('user'));
      db.collection(`users/${user.uid}/wishlist`)
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
  }, []);

  return (
    <div className='bg-gray-900'>
      <Header />
      <Alert />
      <main className='max-w-screen-lg mx-auto min-h-screen h-auto'>
        {wished.length > 0 ? (
          <div>
            <div className='text-white text-3xl p-2 ml-2'>
              No of Series in your wishlist - {wished.length}
            </div>
            <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4'>
              {wished.map((watch) => (
                <WishlistSeries series={watch} />
              ))}
            </div>
          </div>
        ) : (
          <div className='text-white p-5'>
            <p>
              Wished List is Empty Add some series that you have yours eyes on
            </p>
          </div>
        )}
      </main>
      {modal.modal_display ? <Modal /> : null}
    </div>
  );
}

export default wishlist;
