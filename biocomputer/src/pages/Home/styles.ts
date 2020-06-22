import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.form`
  width: 50%;
  height: 50vh;
  padding: 15px;
  background: #555;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    height: 100%;
    width: 25%;
    margin-right: 20px;

    display: flex;
    flex-direction: column;

    textarea {
      flex: 1;
      width: 100%;
      margin-bottom: 20px;
      border: 1px solid #ddd;
      border-radius: 2px;
      padding: 5px;
      font-size: 16px;
      resize: none;
    }

    button {
      border: 0;
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
  }
`;
