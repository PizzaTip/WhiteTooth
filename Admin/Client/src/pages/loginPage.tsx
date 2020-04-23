import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../static/WhiteToothLogo.png';
import { Form, Button, Alert } from 'react-bootstrap';
import Authentication from '../authentication';
import { Redirect } from 'react-router';

type Props = {
    isAuthenticated: boolean,
    login: (username: string, password: string, onStart: () => void, onFail: (error: string) => void, onSuccess: () => void) => void
}

const LoginPage = (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayError, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    const onLoginStart = () => {
        setError("");
        setLoading(true);
    }

    const onLoginFail = (error: string) => {
        setError(error);
    }

    const onLoginSucces = () => {
        setLoading(false);
    };

    const performLogin = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
        }
        else {
            props.login(username,
                password,
                onLoginStart,
                onLoginFail,
                onLoginSucces);
        }
    }

    return (
        props.isAuthenticated ? <Redirect to="/" /> :
            <LoginPageWrapper>
                <LoginPageTitle>Login</LoginPageTitle>
                <img src={logo} /><br />
                {displayError ? <Alert variant="danger">
                    <Alert.Heading>Oh snap!</Alert.Heading>
                    {displayError}
                </Alert> : false}
                <Form noValidate validated={validated} onSubmit={performLogin}>
                    <FormWrapper>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please enter a username.
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please enter a password.
                        </Form.Control.Feedback>
                        </Form.Group>
                    </FormWrapper>
                    <Button disabled={isLoading} variant="primary" type="submit">
                        {isLoading ? 'Loading...' : 'Sign in'}
                    </Button>
                </Form>
            </LoginPageWrapper>
    )
}

const LoginPageWrapper = styled.div`
    margin: auto;
    width: 450px;
    padding: 10px;
    border: 1px solid #ededed;
    border-radius: 2px;
    text-align: center;
    margin-top:50px;
`

const LoginPageTitle = styled.h1`
    
`

const FormWrapper = styled.div`
    text-align: left;
`;

export default LoginPage;