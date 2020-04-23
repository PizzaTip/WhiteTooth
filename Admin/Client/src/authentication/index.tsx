import SideEffectJs from 'side-effect-js';
import { LoginSideEffectType } from '../sideEffects/authentication/loginSideEffect';
export default class Authentication {
    private static _token: string = '';

    public static IsAuthenticated() {
        return this._token !== '';
    }

    public static async AuthenticateAsync(username: string, password: string): Promise<string> {
        const login: LoginSideEffectType = SideEffectJs.Get('login');

        return login(username, password)
            .then((token: string) => {
                this.SetToken(token);
                return Promise.resolve(token);
            })
            .catch((error: string) => { return Promise.reject(error) });
    }

    private static SetToken(token: string) {
        this._token = token;
    }
}
