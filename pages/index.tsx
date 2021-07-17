import { signIn, signOut, useSession } from 'next-auth/client';
import axios from 'axios';
import SeriesFeed from '../components/SeriesFeed';
import Header from '../components/Header';
import { useEffect } from 'react';
import Navigatior from '../components/Navigatior';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import { useDispatch } from 'react-redux';
import { load_user } from '../slices/userSlice';

export default function Home({ tv_shows, page, pageNo }) {
  const [session] = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.user) {
      dispatch(load_user({}));
    }
  }, [dispatch]);

  return (
    <div className='bg-gray-900'>
      <Header />
      <main className='max-w-screen-lg mx-auto'>
        <SeriesFeed tv_shows={tv_shows} />
        <Navigatior first={true} pageNo={pageNo} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  let list;
  await axios
    .get('https://www.episodate.com/api/most-popular?page=1')
    .then((res) => {
      // console.log(res.data);
      list = res.data;
    });

  // let res = await fetch('https://www.episodate.com/api/most-popular?page=1');
  // // list = await res.json();
  // console.log(res);

  return {
    props: {
      page: list.page,
      tv_shows: list.tv_shows,
      pageNo: 1,
    },
  };
}
