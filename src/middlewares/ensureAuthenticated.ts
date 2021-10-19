import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //Receber o Token
  const authToken = req.headers.authorization;

  // validar se o Token ta preenchido
  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    // validar se o token é válido
    const { sub } = verify(
      token,
      "a2d881efbaef1bafac944e4d5fa3ec5a"
    ) as IPayload;

    // Recuperar informações do usuário
    req.user_id = sub;

    return next();
  } catch {
    return res.status(401).end();
  }
}
