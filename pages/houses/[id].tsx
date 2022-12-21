import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import UserEditForm from '../../components/Users/UserEditForm/UserEditForm';

const Flat: NextPage = () => {
  const { query } = useRouter();

  const content = useCallback(() => <UserEditForm id={query.id} />, [query]);

  return (
    <>
      <Head>
        <title>Карточка квартиры</title>
      </Head>
      <div>{content()}</div>
    </>
  );
};

export default Flat;