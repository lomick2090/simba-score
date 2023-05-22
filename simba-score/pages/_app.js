import '../styles/globals.css';
import { MantrasProvider } from '../context/mantrasContext';

export default function App({ Component, pageProps }) {
    return (
        <MantrasProvider>
            <Component {...pageProps} />;
        </MantrasProvider>
    )
}