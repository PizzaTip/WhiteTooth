import SideEffectJs from 'side-effect-js';
import Authentication from '../../authentication';

const realLoginSideEffect = (username: string, password: string): void => { throw "Implement Real API" }; 
const mockLoginSideEffect = (username: string, password: string): void => {
    if (username === "mock" && password === "mock")
        Authentication.SetToken("example-token");
    throw "Wrong username or password";
};

const LoginSideEffect = SideEffectJs.CreateEffect('login', realLoginSideEffect, mockLoginSideEffect);

export default LoginSideEffect;