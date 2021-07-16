import '../styles/globals.css';
import { Provider } from 'react-redux';
import { Provider as AuthProvider } from 'next-auth/client';
import { store } from '../app/store';
import { StateProvider } from '../StateProvider';
import reducer, { initialState } from '../reducer';

function MyApp({ Component, pageProps }) {
  return (
    // <AuthProvider session={pageProps.session}>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </StateProvider>
    // </AuthProvider>
  );
}

export default MyApp;
