import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import Details from '../../../components/Details';
import Header from '../../../components/Header';
import Modal from '../../../components/Modal';
import { modalData } from '../../../slices/modalSlice';

const index = ({ details }) => {
  const modal = useSelector(modalData);
  return (
    <div className='bg-gray-900'>
      <Header />
      <main className='max-w-screen-lg mx-auto min-h-screen h-auto'>
        <Details tv_shows={details.tvShow} />
      </main>

      {modal.modal_display ? <Modal /> : null}
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
