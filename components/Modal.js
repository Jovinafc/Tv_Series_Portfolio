import React from 'react';
import classes from './Modal.module.css';

const Modal = () => {
  return (
    <div className='fixed flex justify-center items-center text-2xl text-red-600 w-full h-full top-0 left-0 overflow-y-auto overflow-x-hidden bg-black opacity-80 z-100'>
      <div className='text-green-200'>
        <div className={classes.middle}>
          <div className={`${classes.bar} ${classes.bar1}`}></div>
          <div className={`${classes.bar} ${classes.bar2}`}></div>
          <div className={`${classes.bar} ${classes.bar3}`}></div>
          <div className={`${classes.bar} ${classes.bar4}`}></div>
          <div className={`${classes.bar} ${classes.bar5}`}></div>
          <div className={`${classes.bar} ${classes.bar6}`}></div>
          <div className={`${classes.bar} ${classes.bar7}`}></div>
          <div className={`${classes.bar} ${classes.bar8}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
