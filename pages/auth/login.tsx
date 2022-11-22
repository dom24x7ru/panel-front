import type { NextPage } from 'next';
import LoginForm from '../../components/LoginForm/LoginForm';
import style from './login.module.scss';

const Login: NextPage = () => (
  <div className={style.login}>
    <LoginForm />
  </div>
);

export default Login;