import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useSession } from 'next-auth/client';
import { useDispatch, useSelector } from 'react-redux';
import { getWatchedList, watchedSeries } from '../slices/watchedlistSlice';
import db from '../firebase';
import WatchedSeries from '../components/WatchedSeries';
import router from 'next/router';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function watchlist() {
  const dispatch = useDispatch();
  const watched = useSelector(watchedSeries);
  console.log(watched);

  useEffect(() => {
    let watchedList = [];

    if (localStorage.user) {
      let user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      db.collection(`users/${user.uid}/watched`)
        .orderBy('timeStamp', 'desc')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            watchedList.push({ id: doc.id, data: doc.data() });
          });
          dispatch(getWatchedList({ watchedList }));
        });
    }

    if (localStorage.user) {
      // let user = JSON.parse(localStorage.getItem('user'));
      // db.collection(`users/${user.uid}/watched`)
      //   .orderBy('timeStamp', 'desc')
      //   .get()
      //   .then((snapshot) => {
      //     snapshot.forEach((doc) => {
      //       watchedList.push({ id: doc.id, data: doc.data() });
      //     });
      //   })
      //   .then((res) => {
      //     dispatch(getWatchedList({ watchedList }));
      //   });
    }
  }, []);

  return (
    <div className='bg-gray-900'>
      <Header />
      <main className='max-w-screen-lg mx-auto min-h-screen h-auto'>
        {watched.length > 0 ? (
          <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4'>
            {watched.map((watch) => (
              <WatchedSeries series={watch} />
            ))}
          </div>
        ) : (
          <div className='text-white p-5'>
            <p>
              Watched List is Empty! Add some series that you have watched from
              <b className='cursor-pointer' onClick={() => router.push('/')}>
                {' '}
                here{' '}
              </b>{' '}
              or search for them from{' '}
              <b
                className='cursor-pointer'
                onClick={() => router.push('/explore')}
              >
                {' '}
                explore
              </b>{' '}
              section{' '}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default watchlist;
