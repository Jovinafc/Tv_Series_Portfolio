import db from '../firebase';
import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import { addToWatchedList } from '../slices/watchedlistSlice';
import { addToWishList } from '../slices/wishlistSlice';

export const addToWatched = async (series, user) => {
  //   let items;
  let data = {
    tv_series_name: series.name,
    tv_series_id: series.id,
    tv_image: series.image_thumbnail_path,
    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
  };
  let exists = false;
  await db
    .collection(`users/${user.uid}/watched`)
    .where('tv_series_id', '==', series.id)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        exists = true;
      });
    });
  if (exists) {
    return 'Already Present';
  } else {
    const res = await db.collection(`users/${user.uid}/watched`).add(data);
    const itemsTemp = {
      id: res.id,
      data: data,
    };
    console.log(itemsTemp);
    return itemsTemp;
  }
};

export const addToWish = async (series, session) => {
  let data = {
    tv_series_name: series.name,
    tv_series_id: series.id,
    tv_image: series.image_thumbnail_path,
    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
  };
  let exists = false;
  await db
    .collection(`users/${session.user.email}/wishlist`)
    .where('tv_series_id', '==', series.id)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        exists = true;
      });
    });
  if (exists) {
    return 'Already Present';
  } else {
    const res = await db
      .collection(`users/${session.user.email}/wishlist`)
      .add(data);
    const items = {
      id: res.id,
      data: data,
    };
    return items;
  }
};
