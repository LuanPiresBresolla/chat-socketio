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
      console.log(messages);
      setTalk(messages);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('receivedMessage', (data: Messages) => {
      console.log(data);
      setTalk([...talk, data]);
    });
  }, [socket, talk]);

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();

    if (message === '') {
      alert('Preencha todos os campos');
      return;
    }

    const data = {
      username,
      message,
    };

    setTalk([...talk, data]);
    setMessage('');
    socket.emit('sendMessage', data);
  }

  return (
    <Container>
      <Content onSubmit={handleSubmit}>
        <div>
          <textarea
            placeholder="Escreva aqui sua mensagem..."
            maxLength={200}
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
