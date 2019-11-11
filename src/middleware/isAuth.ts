import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  isAuth: boolean,
  userId: string
}

const isAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader: string = req.get('Authorization');

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token: string = authHeader.split(' ')[1];

  if (!token) {
    req.isAuth = false;
    return next();
  }

  try {
    let decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      req.isAuth = false;
      return next();
    }

    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();

  } catch (error) {
    req.isAuth = false;
    return next();
  }
}

export default isAuth;