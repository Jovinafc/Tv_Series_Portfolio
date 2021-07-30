import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import db from '../firebase';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase/app';
import { userData, login, logout, load_user } from '../slices/userSlice';
import { LogoutIcon } from '@heroicons/react/outline';

function Header() {
  const router = useRouter();
  const user = useSelector(userData);
  const dispatch = useDispatch();
  const userRef = db.collection(`users`);

  useEffect(() => {
    if (localStorage.user) {
      dispatch(load_user({}));
    }
  }, [dispatch]);

  const signWithGoogle = () => {
    auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        dispatch(login({ user: result.user }));
        console.log(result);
        userRef
          .doc(result.user.uid)
          .set({
            uid: result.user.uid,
            name: result.user.displayName,
            photo: result.user.photoURL,
            email: result.user.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then((data) => {
            console.log(data);
          });
      });
  };

  const signOutUser = () => {
    dispatch(logout({}));
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
        {user ? (
          <p className='hidden sm:flex'>
            Welcome, {user.displayName.split(' ')[0]}
          </p>
        ) : null}

        {user ? (
          <p className='cursor-pointer' onClick={signOutUser}>
            {/* <LogoutIcon className='h-12 p-2' /> */}
            Log out
          </p>
        ) : (
          <p className='cursor-pointer' onClick={signWithGoogle}>
            Sign In
          </p>
        )}
      </div>
    </header>
  );
}

export default Header;
