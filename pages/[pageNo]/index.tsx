import React from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import SeriesFeed from '../../components/SeriesFeed';
import Navigatior from '../../components/Navigatior';

const index = ({ tv_shows, pageNo }) => {
  return (
    <div className='bg-gray-900'>
      <Header />
      <main className='max-w-screen-lg mx-auto'>
        <SeriesFeed tv_shows={tv_shows} />
        <Navigatior first={false} pageNo={pageNo} />
      </main>
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
  let pageNo = context.params.pageNo;
  console.log(pageNo);

  let list;
  await axios
    .get(`https://www.episodate.com/api/most-popular?page=${pageNo}`)
    .then((res) => {
      // console.log(res.data);
      list = res.data;
    });

  return {
    props: {
      page: list.page,
      tv_shows: list.tv_shows,
      pageNo: pageNo,
    },
  };
}
