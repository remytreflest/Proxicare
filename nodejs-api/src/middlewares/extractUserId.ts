import { NextFunction } from 'express';

export function extractUserId(req: any, res: any, next: NextFunction) {
  const userIdHeader = req.header('X-Userid');

  if (!userIdHeader) {
    return res.status(400).json({ message: 'Aucun utilisateur renseigné.' });
  }

  req.userId = userIdHeader;
  next();
}
