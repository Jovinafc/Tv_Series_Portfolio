import axios from 'axios';
import React from 'react';
import Details from '../../../components/Details';
import Header from '../../../components/Header';

const index = ({ details }) => {
  console.log(details);
  return (
    <div className='bg-gray-900'>
      <Header />
      <main className='max-w-screen-lg mx-auto min-h-screen h-auto'>
        <Details tv_shows={details.tvShow} />
      </main>
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
  let id = context.params.seriesId;

  let list;
  await axios
    .get(`https://www.episodate.com/api/show-details?q=${id}`)
    .then((res) => {
      list = res.data;
    });

  return {
    props: {
      details: list,
    },
  };
}
