import React from 'react';
import styled from 'styled-components';
import Request from '../../models/request/Request';
import RequestBarItem from './requestBarItem';

type Props = {
  allRequests: [Request];
  currentRequest: Request;
  onRequestSeleceted: (request: Request) => void;
};

const SideBar = (props: Props) => {
  const { currentRequest, allRequests, onRequestSeleceted } = props;
  return (
    <Bar>
      <NewRequestButton>Create new request</NewRequestButton>
      {allRequests.map((request: Request) => (
        <RequestBarItem
          key={request.id}
          onRequestSeleceted={onRequestSeleceted}
          isSelected={currentRequest.id === request.id}
          request={request}
        />
      ))}
    </Bar>
  );
};

const Bar = styled.div`
  border-right: 1px solid #82817c;
  min-height: 100vh;
  width: 300px;
  left: 0;
  background-color: #403d3d;
  position: fixed;
  cursor: pointer;
`;

const NewRequestButton = styled.div`
  background-color: #545151;
  height: 80px;
  border-bottom: 1px solid #82817c;
  color: white;
  font-weight: bold;
  line-height: 80px;
  text-align: center;

  &:hover {
    background-color: #6e6666;
  }
`;

export default SideBar;
