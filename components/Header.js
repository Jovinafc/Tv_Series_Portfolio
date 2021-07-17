import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import db from '../firebase';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase/app';
import { userData, login, logout } from '../slices/userSlice';

function Header() {
  const router = useRouter();
  const user = useSelector(userData);
  const dispatch = useDispatch();
  const userRef = db.collection(`users`);

  const signWithGoogle = () => {
    auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        dispatch(login({ user: result.user }));
        return userRef.doc(result.user.uid).set({
          uid: result.user.uid,
          name: result.user.displayName,
          photo: result.user.photoURL,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });
  };

  const signOutUser = () => {
    dispatch(logout({}));
  };

  // useEffect(() => {
  //   if (session) {
  //     console.log(session);
  //     userRef
  //       .doc(session.user.email)
  //       .set({
  //         email: session.user.email,
  //         name: session.user.name,
  //         photo: session.user.image,
  //         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //       })
  //       .then((result) => {
  //         console.log('Result Saved: ', result);
  //       })
  //       .catch((err) => {
  //         console.log('Error: ', err);
  //       });
  //   }
  // }, [session]);

  // const getWatched = () => {
  //   let watchedList = [];
  //   db.collection(`users/${session.user.email}/watched`)
  //     .orderBy('timeStamp', 'desc')
  //     .get()
  //     .then((snapshot) => {
  //       console.log(snapshot);
  //       snapshot.forEach((doc) => {
  //         watchedList.push({ id: doc.id, data: doc.data() });
  //       });
  //     })
  //     .then((res) => {
  //       dispatch(getWatchedList({ watchedList }));
  //     });
  // };
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
          <p className='hidden sm:flex'>Welcome, {user.displayName}</p>
        ) : null}

        {user ? (
          <p className='cursor-pointer' onClick={signOutUser}>
            Sign Out
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
