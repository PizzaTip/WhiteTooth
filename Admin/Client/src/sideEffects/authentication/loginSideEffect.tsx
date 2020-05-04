import SideEffectJs from 'side-effect-js';
import Api from '../../api/wtAdminApi';

function delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const realLoginSideEffect: LoginSideEffectType = (username: string, password: string): Promise<string> => {
    return Api.login(username, password);
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