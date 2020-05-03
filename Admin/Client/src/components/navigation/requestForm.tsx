import React from 'react';
import styled from 'styled-components';
import Request from '../../models/request/Request';
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  Accordion,
  Card,
} from 'react-bootstrap';

type Props = {
  request: Request;
};

const RequestForm = (props: Props) => {
  const { request } = props;
  return (
    <Content>
      <Container fluid>
        <RequestName>{request.name}</RequestName>
        <Actions>
          <Button variant="danger">Delete</Button>
          <Button variant="light">Save</Button>
        </Actions>
        <FormSection>
          <Row>
            <Col>
              <RequestFormSectionTitle>Request</RequestFormSectionTitle>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <Form.Group controlId="requestForm.Method">
                <Form.Control value={request.method} as="select">
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PUT">PUT</option>
                  <option value="PATCH">PATCH</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={9}>
              <Form.Group controlId="requestForm.Url">
                <Form.Control type="text" value={request.url} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="requestForm.Description">
                <Form.Control type="text" value="Gets a user" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <HeadersSection>
                <Accordion>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      + Headers
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>Adding headers</Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </HeadersSection>
            </Col>
          </Row>
          <Row>
            <Col>
              <RequestFormSectionTitle>Response</RequestFormSectionTitle>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="requestForm.HttpResponseCode">
                <Form.Control value={request.response.status} as="select">
                  <option value="200">200 - OK</option>
                  <option value="201">201 - Created</option>
                  <option value="400">400 - Bad Request</option>
                  <option value="401">401 - Unauthorized</option>
                  <option value="403">403 - Forbidden</option>
                  <option value="404">404 - Not Found</option>
                  <option value="408">408 - Request Timeout</option>
                  <option value="429">429 - Too Many Requests</option>
                  <option value="500">500 - Internal Server Error</option>
                  <option value="501">501 - Not Implemented</option>
                  <option value="502">502 - Bad Gateway</option>
                  <option value="503">503 - Service Not Available</option>
                  <option value="504">504 - Gateway Timeout</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="requestForm.Url">
                <Form.Control disabled as="select">
                  <option>application/json</option>
                  <option>application/xml</option>
                  <option>text/html</option>
                  <option>text/css</option>
                  <option>text/plain</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="requestForm.Response">
                <Form.Control as="textarea" value={request.response.body} />
              </Form.Group>
            </Col>
          </Row>
        </FormSection>
      </Container>
    </Content>
  );
};

const HeadersSection = styled.div`
  cursor: pointer;

  & * {
    border-radius: 5px;
    background-color: #403d3d !important;
    color: white !important;
    margin-bottom: 30px;
  }

  & .card {
    border: 1px solid white;
  }
`;

const Actions = styled.div`
  position: absolute;
  right: 50px;
  display: inline-block;
  top: 70px;

  & button {
    margin-top: -15px;
    margin-left: 30px;
    width: 150px;
  }
`;

const RequestFormSectionTitle = styled.div`
  color: white;
  width: 100%;
  margin-bottom: 20px;
`;

const FormSection = styled.div`
  margin-top: 30px;
  height: fit-content;
  width: 100%;
`;

const RequestName = styled.div`
  display: inline-block;
  color: white;
  font-size: 50px;
`;

const Content = styled.div`
  position: relative;
  background-color: #9c9b9a;
  min-height: 100vh;
  min-width: 1000px;
  padding: 30px;
  margin-left: 300px;

  & input,
  select,
  text,
  textarea {
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    margin: 0;
    margin-bottom: 35px;
    background-color: #403d3d !important;
    color: white !important;
  }

  textarea {
    height: 300px;
  }
`;

export default RequestForm;
