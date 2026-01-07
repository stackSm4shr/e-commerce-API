import { Router } from 'express';
import { authenticate, validateBodyZod } from '#middlewares';
import { authLoginSchema, authRegisterSchema } from '#schemas';
import { register, login, logout, me, refresh, logoutAll } from '#controllers';

const authRoutes = Router();

authRoutes.post('/register', validateBodyZod(authRegisterSchema), register);
authRoutes.post('/login', validateBodyZod(authLoginSchema), login);
authRoutes.post('/refresh', refresh);

authRoutes.delete('/logout', authenticate, logout);
authRoutes.delete('/logout-all', authenticate, logoutAll);
authRoutes.get('/me', authenticate, me);

export default authRoutes;
