export const environment = {
  production: false,
  provideAuth0: {
    domain: 'dev-nsvd7ah63vgjbmoy.eu.auth0.com',
    clientId: 'rdpDMcZUoYuM2EMvX5DmTw8WSSfUzPCn',
    authorizationParams: {
      redirect_uri: "https://localhost:4200/user-profile",
      audience: 'https://localhost:5000/',
      scope: 'openid email profile read write delete',
    },
    httpInterceptor: {
      allowedList: [
        {
          uri: 'https://localhost:5000/api/*',
          tokenOptions: {
            authorizationParams: {
              audience: 'http://localhost:5000/',
              scope: 'openid email profile read write delete',
            },
          },
        },
      ],
    },
  },
};
