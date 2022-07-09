import { useSession } from 'next-auth/client';
import axios from 'axios';
import SeriesFeed from '../components/SeriesFeed';
import Header from '../components/Header';
import Alert from '../components/Alert';
import Modal from '../components/Modal';
import { useSelector, useDispatch } from 'react-redux';
import Navigatior from '../components/Navigatior';
import { modalData } from '../slices/modalSlice';

export default function Home({ tv_shows, page, pageNo }) {
  const [session] = useSession();
  const modal = useSelector(modalData);

  return (
    <div className='bg-gray-900'>
      <Header />
      <Alert />
      <main className='max-w-screen-lg mx-auto'>
        <SeriesFeed tv_shows={tv_shows} />
        <Navigatior first={true} pageNo={pageNo} />
      </main>
      {modal.modal_display ? <Modal /> : null}
    </div>
  );
}

export async function getServerSideProps(context) {
  let list;
  await axios
    .get('https://www.episodate.com/api/most-popular?page=1')
    .then((res) => {
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
