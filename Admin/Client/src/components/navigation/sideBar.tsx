import React from 'react';
import styled from 'styled-components';
import Request from '../../models/request/Request';
import RequestBarItem from './requestBarItem';

type Props = {
  allRequests: [Request];
  currentRequest: Request;
  onRequestSeleceted: Function;
};

const SideBar = (props: Props) => {
  const { currentRequest, allRequests, onRequestSeleceted } = props;
  return (
    <Bar>
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

export default SideBar;
