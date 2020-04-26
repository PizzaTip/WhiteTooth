import config from './config.json';

interface Configuration {
    authentication: AuthenticationConfiguration
    adminserver: ServerConfiguration
}

interface AuthenticationConfiguration {
    username: string,
    password: string,
    token: string
}

interface ServerConfiguration {
    port: string
    routes: {
        authentication: string
    }
}

const appConfig: Configuration = config;

export { appConfig };