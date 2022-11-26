import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import '../styles/prime_theme.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
  
  <Layout>
  <Component {...pageProps} />
  </Layout>
  )
};
