import styled from 'styled-components';

export const Container = styled.form`
  margin: 0 auto;
  width: 50%;
  height: 100vh;
  background: rgba(139, 0, 255, 0.4);
  border-radius: 10px;
  border: 15px solid rgba(113, 89, 193, 0.3);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  input {
    padding: 5px;
    margin: 0 10px;
  }

  button {
    padding: 5px;
  }
`;
