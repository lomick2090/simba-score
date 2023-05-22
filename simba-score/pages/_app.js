import '../styles/globals.css';
import { MantrasProvider } from '../context/mantrasContext';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App({ Component, pageProps }) {
    return (
        <MantrasProvider>
            <Component {...pageProps} />
        </MantrasProvider>
    )
}