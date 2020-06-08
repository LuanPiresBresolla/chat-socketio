import React, { useState, FormEvent, useMemo, useEffect } from 'react';
import socketio from 'socket.io-client';

import { Container } from './styles';

import Messages from '../Messages';

interface Messages {
  username: string;
  message: string;
}

const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [talk, setTalk] = useState<Messages[]>([]);

  const socket = useMemo(() => socketio('http://192.168.8.30:3333'), []);

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

    if (username === '' || message === '') {
      alert('Preencha todos os campos');
      return;
    }

    const data = {
      username,
      message,
    };

    setTalk([...talk, data]);

    socket.emit('sendMessage', data);
  }

  return (
    <>
      <Container onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            maxLength={30}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {!!talk.length && <Messages messages={talk} />}

        <div>
          <label htmlFor="Message">Mensagem</label>
          <input
            type="text"
            id="Message"
            maxLength={30}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </div>
      </Container>
    </>
  );
};

export default Home;
