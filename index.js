require('dotenv').config();
const express = require('express');
const productRouter = require('./routers/productRoute');
const error = require('./middlewares/error');

// não remova esse endpoint, e para o avaliador funcionar
const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
