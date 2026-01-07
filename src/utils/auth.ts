import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.ACCESS_JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_JWT_SECRET!;
const ACCESS_TTL_SEC = Number(process.env.ACCESS_TOKEN_TTL ?? 900);
const REFRESH_TTL_SEC = Number(process.env.REFRESH_TOKEN_TTL ?? 1209600);
const JWT_ISSUER = process.env.JWT_ISSUER ?? 'SE003';

export const signAccessToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: `${ACCESS_TTL_SEC}s`,
    issuer: JWT_ISSUER,
  });

export const signRefreshToken = (payload: object) =>
  jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: `${REFRESH_TTL_SEC}s`,
    issuer: JWT_ISSUER,
  });

// Cookie options
const isProd = process.env.NODE_ENV === 'production';

export const accessCookieOpts = {
  httpOnly: true,
  sameSite: 'lax' as const, // strict, none
  secure: isProd,
  maxAge: ACCESS_TTL_SEC * 1000,
};

export const refreshCookieOpts = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: isProd,
  maxAge: REFRESH_TTL_SEC * 1000,
};

// http:locolhosts:5173 => FRONTEND
// http:locolhosts:3000 => BACKEND
// https:render.deployment.com/yourProject
