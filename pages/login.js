import React from 'react';
import LoginForm from 'components/LoginForm/LoginForm';

const Login = () => (
  <div id="login">
    <LoginForm />
  </div>
);

Login.getInitialProps = () => ({ onlyAnonymous: true });

export default Login;
