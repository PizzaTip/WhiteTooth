import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../static/WhiteToothLogo.png';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <React.Fragment>
            <div>Login</div>
            <img src={logo}/>
            <StyledInput type="text" placeholder="user" value={username} onChange={e => setUsername(e.target.value)} />
            <StyledInput type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        </React.Fragment>
    )
}

const StyledInput = styled.input`
    border:1px solid yellow;
`;

export default LoginPage;