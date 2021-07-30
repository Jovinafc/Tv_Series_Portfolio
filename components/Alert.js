import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alertData, removeAlert } from '../slices/alertSlice';

const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector(alertData);
  console.log(alert);

  const closeAlert = () => {
    dispatch(removeAlert({}));
  };

  setTimeout(() => dispatch(removeAlert({})), 4000);

  return (
    <div
      //class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
      className={
        alert.alertDisplay && alert.alertType == 'Danger'
          ? `bg-red-100 border w-3/12 border-red-400 bottom-1 right-1 text-red-700 px-4 py-3 rounded fixed z-10`
          : alert.alertDisplay && alert.alertType == 'Success'
          ? `bg-green-100 border w-3/12 border-green-400 bottom-1 right-1 text-green-700 px-4 py-3 rounded fixed z-10`
          : alert.alertDisplay && alert.alertType == 'Warning'
          ? `bg-yellow-100 border w-3/12 border-yellow-400 bottom-1 right-1 text-yellow-700 px-4 py-3 rounded fixed z-10`
          : 'hidden'
      }
      role='alert'
    >
      <span class='block sm:inline'>{alert.alertMessage}</span>
      <span
        class='absolute top-0 bottom-0 right-0 px-4 py-3'
        onClick={closeAlert}
      >
        <svg
          class='fill-current h-6 w-6 text-black-500'
          role='button'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
        >
          <title>Close</title>
          <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
        </svg>
      </span>
    </div>
  );
};

export default Alert;
