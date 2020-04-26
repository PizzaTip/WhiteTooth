import SideEffectJs from 'side-effect-js';
import { ApiClient } from '../../api/ApiClient';

function delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const realLoginSideEffect: LoginSideEffectType = (username: string, password: string): Promise<string> => {
    return ApiClient.Login(username, password);
}; 
const mockLoginSideEffect: LoginSideEffectType = (username: string, password: string): Promise<string> => {
    return delay(3000).then(() => {
        if (username === "mock" && password === "mock")
            return Promise.resolve("example-token");
        return Promise.reject("Wrong username or password");
    })
};

export type LoginSideEffectType = (username: string, password: string) => Promise<string>;
export default SideEffectJs.CreateEffect('login', realLoginSideEffect, mockLoginSideEffect);