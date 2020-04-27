import SideEffectJs from 'side-effect-js';
import Cookies from 'universal-cookie';
import { LoginSideEffectType } from '../sideEffects/authentication/loginSideEffect';

export default class Authentication {
    private static COOKIE_NAME: string = "wtAuthToken"; 
    private static _cookies = new Cookies();

    public static IsAuthenticated() {
        return this._cookies.get(this.COOKIE_NAME) && this._cookies.get(this.COOKIE_NAME) !== '';
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

    public static Logout() {
        this._cookies.remove(this.COOKIE_NAME);
    }

    private static SetToken(token: string) {
        const msMonth = 1000 * 60 * 60 * 24 * 30;
        this._cookies.set(this.COOKIE_NAME, token, { path: '/', expires: new Date(Date.now() + (msMonth)) });
    }
}
