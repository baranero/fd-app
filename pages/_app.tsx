import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (

<div className='pb-10'>
  
            <Component {...pageProps} />
</div>



  )
}
