const checkJwt = (req: any, res: any, next: any) => {
  // Bypass pour les tests
  req.user = { sub: 'test-user-id' }; // Simuler un utilisateur authentifié
  next();
};

export default checkJwt;