import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-black bg-opacity-60">
      <Component {...pageProps} />
    </div>
  );
}
