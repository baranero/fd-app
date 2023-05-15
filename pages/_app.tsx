
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
<div className="w-full bg-[url('/images/background.jpg')] bg-fixed bg-no-repeat bg-center bg-cover">
<div className="bg-black w-full h-full lg:bg-opacity-50">
          <Component {...pageProps} />
</div>
</div>

  )
}
