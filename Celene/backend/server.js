import express from 'express';
import mongoose from 'mongoose';
import productRouter from './router/productRouter.js';
import userRouter from './router/userRouter.js';
import dotenv from 'dotenv';
import orderRouter from './router/orderRouter.js';
import path from 'path';
import uploadRouter from './router/uploadRouter.js';

dotenv.config();
const app= express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use('/api/uploads', uploadRouter);



app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);


app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'AZzZHtaMIU2kRNHkSdDcoqY821giyB2dpVYgLr1IKbV1IbniQLeJdG7NHgFin20MHTbAN0xeyAucT3o7');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res)=>{
    res.send('Server is ready');
});
//middleware/error catcher
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });
const port= process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`serve at http://localhost:${port}`);
});