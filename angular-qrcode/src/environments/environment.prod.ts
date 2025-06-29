const VPS_IP = '193.168.145.61';
const redirect_uri = `https://${VPS_IP}/`;
const urls_back = `https://${VPS_IP}/api`;

export const environment = {
  production: true,
  provideAuth0: {
    domain: 'dev-nsvd7ah63vgjbmoy.eu.auth0.com',
    clientId: 'rdpDMcZUoYuM2EMvX5DmTw8WSSfUzPCn',
    authorizationParams: {
      redirect_uri: redirect_uri,
      audience: 'https://193.168.145.61/',
      scope: 'openid email profile read write delete',
    },
  },
  urls:{
    back: urls_back
  }
};