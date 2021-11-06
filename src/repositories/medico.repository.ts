import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Medico, MedicoRelations, Paciente, Cita} from '../models';
import {PacienteRepository} from './paciente.repository';
import {CitaRepository} from './cita.repository';

export class MedicoRepository extends DefaultCrudRepository<
  Medico,
  typeof Medico.prototype.id,
  MedicoRelations
> {

  public readonly pacientes: HasManyRepositoryFactory<Paciente, typeof Medico.prototype.id>;

  public readonly citas: HasManyRepositoryFactory<Cita, typeof Medico.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>, @repository.getter('CitaRepository') protected citaRepositoryGetter: Getter<CitaRepository>,
  ) {
    super(Medico, dataSource);
    this.citas = this.createHasManyRepositoryFactoryFor('citas', citaRepositoryGetter,);
    this.registerInclusionResolver('citas', this.citas.inclusionResolver);
    this.pacientes = this.createHasManyRepositoryFactoryFor('pacientes', pacienteRepositoryGetter,);
    this.registerInclusionResolver('pacientes', this.pacientes.inclusionResolver);
  }
}
