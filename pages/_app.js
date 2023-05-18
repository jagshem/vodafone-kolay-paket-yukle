import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://upload.wikimedia.org/wikipedia/commons/a/a6/Vodafone_icon.svg"
        />
        <title>Kolay Paket Yükle - Vodafone</title>

        {/* Açıklama meta etiketi */}
        <meta
          name="description"
          content="Kolay Paket Yükle - Vodafone ile paket yüklemelerinizi hızlı ve kolayca gerçekleştirebilirsiniz."
        />

        {/* Open Graph etiketleri (Facebook, Instagram, WhatsApp vb.) */}
        <meta property="og:title" content="Kolay Paket Yükle - Vodafone" />
        <meta
          property="og:description"
          content="Kolay Paket Yükle - Vodafone ile paket yüklemelerinizi hızlı ve kolayca gerçekleştirebilirsiniz."
        />
        <meta property="og:url" content="https://vodafone-paket.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card etiketleri */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Kolay Paket Yükle - Vodafone" />
        <meta
          name="twitter:description"
          content="Kolay Paket Yükle - Vodafone ile paket yüklemelerinizi hızlı ve kolayca gerçekleştirebilirsiniz."
        />
        <meta name="twitter:url" content="https://vodafone-paket.vercel.app/" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
