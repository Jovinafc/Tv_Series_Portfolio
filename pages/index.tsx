import { signIn, signOut, useSession } from 'next-auth/client';
import axios from 'axios';
import SeriesFeed from '../components/SeriesFeed';
import Header from '../components/Header';

import Navigatior from '../components/Navigatior';

export default function Home({ tv_shows, page, pageNo }) {
  const [session] = useSession();

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

  return {
    props: {
      page: list.page,
      tv_shows: list.tv_shows,
      pageNo: 1,
    },
  };
}
