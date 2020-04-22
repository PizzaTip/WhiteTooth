export default class Authentication {
    private static _token: string = '';

    public static IsAuthenticated() {
        return this._token !== '';
    }

    public static SetToken(token: string) {
        this._token = token;
    }
}
