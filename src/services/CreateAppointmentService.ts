import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  title: string,
  status: string,
  deadline: Date;
  provider_id: string;  
}

class CreateAppointmentService {
  public async execute({ title, status, deadline, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(deadline);

    const findAppointementInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    const appointment = appointmentsRepository.create({
      title,
      status,
      deadline: appointmentDate,
      provider_id,
      });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
