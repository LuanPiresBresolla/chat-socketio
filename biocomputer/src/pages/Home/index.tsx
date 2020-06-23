import React, { useState, FormEvent, useMemo, useEffect } from 'react';
import socketio from 'socket.io-client';

import { Container, Content } from './styles';

import Messages from '../Messages';

interface Messages {
  username: string;
  message: string;
}

const Home: React.FC = () => {
  const [username, setUsername] = useState('teste');
  const [message, setMessage] = useState('');
  const [talk, setTalk] = useState<Messages[]>([]);

  const socket = useMemo(() => socketio('http://192.168.8.30:3333'), []);

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      setUsername(user);
    }
  }, []);

  useEffect(() => {
    socket.on('previousMessage', (messages: Messages[]) => {
      setTalk(messages);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('receivedMessage', (data: Messages) => {
      setTalk([...talk, data]);
    });
  }, [socket, talk]);

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();

    if (message === '') {
      // eslint-disable-next-line
      alert('Preencha todos os campos');
      return;
    }

    const data = {
      username,
      message,
    };

    setMessage('');
    socket.emit('sendMessage', data);
    setTalk([...talk, data]);
  }

  return (
    <Container>
      <Content onSubmit={handleSubmit}>
        <div>
          <textarea
            placeholder="Escreva aqui sua mensagem..."
            maxLength={50}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </div>

        {!!talk.length && <Messages messages={talk} />}
      </Content>
    </Container>
  );
};

export default Home;
