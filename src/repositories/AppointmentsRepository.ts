import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(deadline: Date): Promise<Appointment | null> {
    const findAppointement = await this.findOne({
      where: { deadline },
    });

    return findAppointement || null;
  }
}

export default AppointmentsRepository;
