import type { NextPage } from "next";
import Head from "next/head";
import Users from "../../components/Users/Users";

const UsersRegistry: NextPage = () => {
  return (
    <>
      <Head>
        <title>Реестр жильцов</title>
      </Head>
      <div>
        <Users />
      </div>
    </>
  );
};

export default UsersRegistry;
