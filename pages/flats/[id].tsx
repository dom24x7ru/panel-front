import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import FlatRegistry from '../../components/House/components/FlatRegitsry/FlatRegistry';



const Flats: NextPage = () => {
  const { query } = useRouter();
  const content = useCallback(() => <FlatRegistry id={query.id} />, [query]);
  return (
    <>
      <Head>
        <title>Реестр квартир</title>
      </Head>
      <div>{content()}</div>
    </>
  );
};

export default Flats;