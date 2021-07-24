import '../styles/globals.css';
import { Provider } from 'react-redux';
import { Provider as AuthProvider } from 'next-auth/client';
import { store } from '../app/store';
import { StateProvider } from '../StateProvider';
import reducer, { initialState } from '../reducer';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';

const progress = new ProgressBar({
  size: 4,
  color: '#38a169',

  className: 'bar-of-progress',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
