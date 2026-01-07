import express from 'express';
import cookieParser from 'cookie-parser';
import '#db';
import { authRoutes, userRoutes, productRoutes ,categoryRoutes, orderRoutes } from '#routes';
import { errorHandler } from '#middlewares';
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4000', 
  credentials: true,               
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/orders', orderRoutes);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`\x1b[35mMain app listening at http://localhost:${port}\x1b`)
);
