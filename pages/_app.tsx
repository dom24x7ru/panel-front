import type { AppProps } from "next/app";
import '../styles/prime_theme.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
