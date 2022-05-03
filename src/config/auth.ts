import { Env } from 'src/core/utils/env';

export function auth() {
  return {
    passwordSalt: Env.readInt('PASSWORD_SALT', 10),

    jwtSecret: Env.readString('JWT_SECRET', 'jwt_secret'),
    jwtExpired: Env.readString('JWT_EXPIRED', '1h'),
  };
}
