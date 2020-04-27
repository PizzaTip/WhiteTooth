import React from 'react';
import { Badge } from 'react-bootstrap';
import { eHttpMethodType } from '../../models/request/enums';

const GetByMethodName = (method: String) => {
  switch (method.toLowerCase()) {
    case eHttpMethodType.GET: {
      return GetBadge();
    }
    case eHttpMethodType.POST: {
      return PostBadge();
    }
    case eHttpMethodType.DELETE: {
      return DeleteBadge();
    }
    case eHttpMethodType.PUT: {
      return PutBadge();
    }
    case eHttpMethodType.PATCH: {
      return PatchBadge();
    }
  }
};

const PostBadge = () => {
  return (
    <Badge pill variant="primary">
      POST
    </Badge>
  );
};

const GetBadge = () => {
  return (
    <Badge pill variant="success">
      GET
    </Badge>
  );
};

const DeleteBadge = () => {
  return (
    <Badge pill variant="danger">
      DELETE
    </Badge>
  );
};

const PutBadge = () => {
  return (
    <Badge pill variant="warning">
      PUT
    </Badge>
  );
};

const PatchBadge = () => {
  return (
    <Badge pill variant="info">
      PATCH
    </Badge>
  );
};

export default GetByMethodName;
