import React from 'react';
import styled from 'styled-components';
import Request from '../../models/request/Request';

type Props = {
  request: Request;
};

const RequestForm = (props: Props) => {
  const { request } = props;
  return <Content>{request.name}</Content>;
};

const Content = styled.div`
  background-color: #d1cbcb;
  min-height: 100vh;
  width: 100%;
  padding: 30px;
  position: fixed;
  left: 300px;
`;

export default RequestForm;
