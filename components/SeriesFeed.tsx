import React from 'react';
import Series from './Series';

const SeriesFeed = ({ tv_shows }) => {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4'>
      {tv_shows.map((series) => (
        <Series series={series} key={series.id} />
      ))}
    </div>
  );
};

export default SeriesFeed;
