const express = require('express');
const routerApi = require('./routes');
const app = express();

const { logErrors, errorHandler, BoomErrorHandler } = require('./middlewares/error.handler')

const colors = require('colors');

const port = 3000;

app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(BoomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(colors.magenta(`
  ${colors.yellow("###########################################################################")}
                    SERVIDOR NODE JS EXPRESS PLATZI COURSE
  ${colors.yellow("###########################################################################")}                  
                                ${colors.yellow("**** v.1 ****")}
  ===========================================================================
                    ${colors.yellow(`SERVIDOR HTTP CORRIENDO EN PUERTO ${port}`)}
  `))
  }
);
