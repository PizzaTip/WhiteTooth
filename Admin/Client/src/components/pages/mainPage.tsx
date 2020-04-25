import React, { useState, useEffect } from 'react';
import API from '../../api/wtAdminApi';
import Request from '../../models/request/Request';
import SideBar from '../navigation/sideBar';
import RequestForm from '../navigation/requestForm';

const MainPage = () => {
  const [requests, setRequests] = useState<[Request]>();
  const [currentRequest, setCurrentRequest] = useState<Request>();

  useEffect(() => {
    const loadReqests = async () => {
      const requestsData = await API.loadAllRequests('sometoken');
      setRequests(requestsData);
      setCurrentRequest(requestsData[0]);
    };

    loadReqests();
  }, []);

  const onRequestSeleceted = (request: Request) => {
    setCurrentRequest(request);
  };

  const renderLoader = () => {
    return <div>Loading requests...</div>;
  };

  const render = () => {
    if (requests && currentRequest) {
      return (
        <>
          <SideBar
            onRequestSeleceted={onRequestSeleceted}
            currentRequest={currentRequest}
            allRequests={requests}
          />
          <RequestForm request={currentRequest} />{' '}
        </>
      );
    } else {
      return renderLoader();
    }
  };

  return render();
};

export default MainPage;
