import React, { useState, useEffect } from 'react';
import API from '../api/wtAdminApi';
import Request from '../models/Request';

const MainPage = () => {
  const [requests, setRequests] = useState<[Request]>();

  useEffect(() => {
    const loadReqests = async () => {
      const response = await API.loadAllRequests('sometoken');
      setRequests(response);
    };

    loadReqests();
  }, []);

  return (
    <div>
      {requests &&
        requests.map((request) => <div key={request.id}>{request.name}</div>)}
    </div>
  );
};

export default MainPage;
