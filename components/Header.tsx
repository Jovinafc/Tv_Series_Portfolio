import React, { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import db from '../firebase';
import { useDispatch } from 'react-redux';
import { getWatchedList } from '../slices/watchedlistSlice';
import firebase from 'firebase/app';

function Header() {
  const router = useRouter();
  const [session] = useSession();
  const userRef = db.collection(`users`);

  console.log(session);

  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      console.log(session);
      userRef
        .doc(session.user.email)
        .set({
          email: session.user.email,
          name: session.user.name,
          photo: session.user.image,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((result) => {
          console.log('Result Saved: ', result);
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
    }
  }, [session]);

  const getWatched = () => {
    let watchedList = [];
    db.collection(`users/${session.user.email}/watched`)
      .orderBy('timeStamp', 'desc')
      .get()
      .then((snapshot) => {
        console.log(snapshot);
        snapshot.forEach((doc) => {
          watchedList.push({ id: doc.id, data: doc.data() });
        });
      })
      .then((res) => {
        dispatch(getWatchedList({ watchedList }));
      });
  };
  return (
    <header className='flex sticky items-center top-0 z-50 bg-black text-yellow-300 p-5'>
      <div className='md:ml-10'>
        <h1
          className='text-xl md:text-2xl cursor-pointer'
          onClick={() => router.push('/')}
        >
          SeriesGram
        </h1>
      </div>

      <div
        // className='flex ml-auto border-2 pl-5 justify-between space-x-3'
        className='flex ml-auto space-x-1 text-sm md:justify-between md:space-x-3 md:text-lg  md:pl-5'
      >
        <p className='cursor-pointer' onClick={() => router.push('/explore')}>
          Explore
        </p>
        <p className='cursor-pointer' onClick={() => router.push('/watchlist')}>
          Watched
        </p>
        <p className='cursor-pointer' onClick={() => router.push('/wishlist')}>
          Wishlist
        </p>
      </div>

      <div className='ml-auto flex space-x-3'>
        {session ? (
          <p className='hidden sm:flex'>Welcome, {session.user.name}</p>
        ) : null}

        {session ? (
          <p className='cursor-pointer' onClick={() => signOut()}>
            Sign Out
          </p>
        ) : (
          <p className='cursor-pointer' onClick={() => signIn()}>
            Sign In
          </p>
        )}
      </div>
    </header>
  );
}

export default Header;
