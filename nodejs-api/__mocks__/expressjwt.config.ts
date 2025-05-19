import { unless } from 'express-unless';

const checkJwt = (req: any, res: any, next: any) => {
  // Bypass pour les tests
  req.user = { sub: 'test-user-id' }; // Simuler un utilisateur authentifié
  next();
};

checkJwt.unless = unless;

export default checkJwt;