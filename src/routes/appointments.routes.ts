import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

//rotas do apontamento

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { title, status, deadline, provider_id} = request.body;
   
  const parsedDate = parseISO(deadline); 

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    title,
    status,
    deadline: parsedDate,
    provider_id
  });

  return response.json(appointment);
});

export default appointmentsRouter;
