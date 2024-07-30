
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../utils/queryClient';
import { TranslationProvider } from '../contexts/TranslationContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TranslationProvider>
          <Component {...pageProps} />
        </TranslationProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
