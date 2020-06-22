import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 2px;
    height: 45px;
    padding: 0 15px;
    font-size: 16px;
    text-align: center;
  }

  a {
    border-radius: 2px;
    width: 100%;
    height: 42px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: bold;
    background: #f05a5b;
    color: #fff;
    text-decoration: none;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #e14f50;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 30px;

  display: flex;
  flex-direction: column;

  background: #fff;
  border-radius: 4px;
`;
