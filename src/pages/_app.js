import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify';
import 'moment/locale/tr'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ToastContainer/>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
