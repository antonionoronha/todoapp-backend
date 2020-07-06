import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

var express = require('express')
var cors = require('cors')
var app = express()



const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
