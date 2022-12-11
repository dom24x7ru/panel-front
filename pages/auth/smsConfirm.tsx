import type { NextPage } from 'next';
import ConfirmCode from '../../components/LoginForm/ConfirmCode/ConfirmCode';

const smsConfirm: NextPage = () => (
  <div>
    <ConfirmCode />
  </div>
);

export default smsConfirm;