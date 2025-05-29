

const LOCAL_IP_SAME_WIFI = true;
const YOUR_IP = '192.168.1.19'; // ipconfig --> ipv4
const host = LOCAL_IP_SAME_WIFI ? YOUR_IP : "localhost";

const redirect_uri = `https://${host}:4200/`;
const urls_back = `https://${host}:5000/api`;

export const environment = {
  production: false,
  provideAuth0: {
    domain: 'dev-nsvd7ah63vgjbmoy.eu.auth0.com',
    clientId: 'rdpDMcZUoYuM2EMvX5DmTw8WSSfUzPCn',
    authorizationParams: {
      redirect_uri: redirect_uri,
      audience: 'https://localhost:5000/',
      scope: 'openid email profile read write delete',
    },
  },
  urls:{
    back: urls_back
  }
};
