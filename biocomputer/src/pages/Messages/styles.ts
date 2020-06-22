import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  overflow-y: scroll;
  padding-right: 10px;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: #444;
    border-radius: 4px;
  }

  div {
    min-width: 100%;
    max-height: 50px;
    margin-bottom: 10px;

    display: flex;
    flex-direction: row;

    background: #fff;
    border-radius: 5px;

    strong {
      width: 100px;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      background: #f05a5b;
      border-radius: 5px;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    span {
      padding: 5px;
      color: #555;

      display: flex;
      align-items: center;
    }
  }
`;

export const User = styled.div`
  display: flex;
  flex: 1;
  background: #ff0000;
`;
