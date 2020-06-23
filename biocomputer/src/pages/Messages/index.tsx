import React from 'react';

import { Container } from './styles';

interface PropsMessages {
  username: string;
  message: string;
}

interface Props {
  messages: PropsMessages[];
}

const Messages: React.FC<Props> = ({ messages }) => {
  return (
    <Container>
      {messages.map((message) => (
        <div key={message.message}>
          <strong>{message.username}</strong>
          <span>{message.message}</span>
        </div>
      ))}
    </Container>
  );
};

export default Messages;
