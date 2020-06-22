import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Container, Content } from './styles';

const SignIn: React.FC = () => {
  const [user, setUser] = useState('');

  function saveUser(): void {
    localStorage.setItem('user', user);
  }

  return (
    <Container>
      <Content>
        <input
          type="text"
          placeholder="Seu nick"
          maxLength={10}
          onChange={(e) => setUser(e.target.value)}
        />

        <Link to="home" onClick={saveUser}>
          Entrar
        </Link>
      </Content>
    </Container>
  );
};

export default SignIn;
