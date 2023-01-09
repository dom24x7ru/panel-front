import type { NextPage } from "next";
import Head from "next/head";
import House from "../../components/House/House";

const Homes: NextPage = () => (
  <>
    <Head>
      <title>Дома</title>
      <meta property="og:title" content="My page title" key="title" />
    </Head>
    <div>
      <House />
    </div>
  </>
);

export default Homes;
