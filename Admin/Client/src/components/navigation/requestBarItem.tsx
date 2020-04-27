import React from 'react';
import styled from 'styled-components';
import Request from '../../models/request/Request';
import HttpMethodBadges from '../shared/HttpMethodBadges';

type Props = {
  request: Request;
  isSelected: Boolean;
  onRequestSeleceted: (request: Request) => void;
};

interface SideBarItemProps {
  readonly isSelected: Boolean;
}

const RequestBarItem = (props: Props) => {
  const { request, isSelected, onRequestSeleceted } = props;
  return (
    <Item
      onClick={() => {
        onRequestSeleceted(request);
      }}
      isSelected={isSelected}
      key={request.id}
    >
      {HttpMethodBadges(request.method)}
      <RequestName>{request.name}</RequestName>
      <RequestDescription>Gets a user</RequestDescription>
    </Item>
  );
};

const Item = styled.div<SideBarItemProps>`
  height: fit-content;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #82817c;

  & span {
    font-size: 12px;
  }

  ${(props) =>
    props.isSelected &&
    `
    background-color: #6e6666;
  `};

  &:hover {
    background-color: #6e6666;
  }
`;

const RequestName = styled.div`
  margin-left: 10px;
  display: inline-block;
  color: white;
`;
const RequestDescription = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #a8a8a3;
`;

export default React.memo(RequestBarItem);
