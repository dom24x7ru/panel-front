import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import style from './Layout.module.scss';

type EmptyLayoutProps = {
  user?: any;
  children: any;
};

const EmptyLayout: React.FC<EmptyLayoutProps> = ({ children }) => {
  const { push } = useRouter();

  useEffect(() => {
    const isAuthAxios = localStorage.getItem('socketCluster.authToken') && localStorage.getItem('socketCluster.authToken') !== undefined;

    if (!isAuthAxios) {
      push('/auth/login').then();
    }
  });

  return (
    <div>
      <div className={style.content}>{children}</div>
    </div>
  );
};

export default EmptyLayout;
